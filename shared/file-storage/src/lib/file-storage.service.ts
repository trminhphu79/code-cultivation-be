import { Injectable } from '@nestjs/common';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Analytics, getAnalytics } from 'firebase/analytics';

@Injectable()
export class FileStorageService {
  private instance!: FirebaseApp;
  private analytics!: Analytics;
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCAmrSXk2twJ_v-BKMCj0BSKevEzOWnIFE',
      authDomain: 'tangkinhcode-dev.firebaseapp.com',
      projectId: 'tangkinhcode-dev',
      storageBucket: 'tangkinhcode-dev.firebasestorage.app',
      messagingSenderId: '838690983839',
      appId: '1:838690983839:web:12f95513ee55dd436df7aa',
      measurementId: 'G-013G4P503Q',
    };
    // Initialize Firebase
    this.instance = initializeApp(firebaseConfig);
    this.analytics = getAnalytics(this.instance);
  }
}
