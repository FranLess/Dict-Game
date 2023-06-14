import { Component, OnInit } from '@angular/core';
import { ConversationApiService } from '../services/converations/conversation-api.service';
import { ActivatedRoute } from '@angular/router';
import { MessageApiService } from '../services/messages/message-api.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
  public conversationLoaded: boolean = false;
  public id: number = 0;
  public sub: any;

  public conversation: any;
  public messages: any;

  public newMessage: string = '';

  public messagesInterval: any;

  constructor(
    private route: ActivatedRoute,
    private conversationService: ConversationApiService,
    private messageService: MessageApiService
  ) {}

  ngOnInit() {
    this.messagesInterval = setInterval(() => {
      this.getConversation();
    }, 10 * 1000);
  }

  async getConversation() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });

    this.conversation = await this.conversationService.getConversation(this.id);
    this.messages = await this.conversationService.getMessagesFromConversation(
      this.conversation
    );
    console.log(this.messages);
    console.log(this.conversation);
    this.conversationLoaded = true;
  }

  async sendMessage() {
    // if (this.messages.length == 0) {
    //   this.conversationService.startInverseConversation(this.id);
    // }
    this.messageService.sendMessage(this.newMessage, this.id);
  }
  ionViewDidLeave() {
    clearInterval(this.messagesInterval);
  }
}
