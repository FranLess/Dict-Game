import { TestBed } from '@angular/core/testing';

import { ConversationApiService } from './conversation-api.service';

describe('ConversationApiService', () => {
  let service: ConversationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
