import { AdminGuard } from './guards/admin.guard';
import { SesionGuard } from './guards/sesion.guard';
import { SocialLoginService } from './api/social-login.service';
import { ApiService } from './api/api.service';
import { GoogleMapsApiService } from './api/google-maps-api.service';
import { StorageService } from './storage/storage.service';
import { TransferImgFileService } from './transfer/transfer-img-file.service';
import { TomarFoto } from './transfer/capture-img';
export * from './models/map-style';
export { ApiService, StorageService, TransferImgFileService, TomarFoto, SocialLoginService, SesionGuard, AdminGuard, GoogleMapsApiService, };
//# sourceMappingURL=providers.js.map