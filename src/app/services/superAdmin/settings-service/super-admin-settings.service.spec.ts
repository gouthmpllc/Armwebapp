import { TestBed, inject } from '@angular/core/testing';

import { SuperAdminSettingsService } from './super-admin-settings.service';

describe('SuperAdminSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuperAdminSettingsService]
    });
  });

  it('should be created', inject([SuperAdminSettingsService], (service: SuperAdminSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
