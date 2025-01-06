import { Inject } from '@nestjs/common';
import { FirebaseConstants } from './fire-storage.constant';

export function InjectFireStorage() {
  return Inject(FirebaseConstants.FIREBASE_TOKEN);
}
