import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

const cacheStore = new Map<string, { data: any; expiry: number }>();

@Injectable()
export class CustomCacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    // Cache only GET requests
    if (req.method !== "GET") {
      return next.handle();
    }

    const key = req.originalUrl || req.url;
    const cached = cacheStore.get(key);

    if (cached && Date.now() < cached.expiry) {
      console.log(`[Cache HIT]: Serving ${key} from memory cache`);
      return of({ ...cached.data, fromCache: true });
    }

    return next.handle().pipe(
      tap((data) => {
        console.log(`[Cache MISS]: Caching ${key} for 60 seconds`);
        cacheStore.set(key, { data, expiry: Date.now() + 60000 });
      })
    );
  }
}
