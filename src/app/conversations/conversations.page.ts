import { Component, OnInit } from '@angular/core';
import { ConversationApiService } from '../services/converations/conversation-api.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
})
export class ConversationsPage implements OnInit {
  public conversations: any;
  public conversationsLoaded: boolean = false;
  constructor(private conversationsService: ConversationApiService) {}

  ngOnInit() {
    this.getConversations();
  }

  async getConversations() {
    this.conversations = await this.conversationsService.getConversations();

    this.conversationsLoaded = true;
    console.log(this.conversations);
  }

  async showConversation(id: number) {
    this.conversationsService.showConversation(id);
  }

  async deleteConversation(id: number) {
    this.conversationsService.deleteConvesation(id);
    this.getConversations();
  }
}
