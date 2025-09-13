import { Component, HostListener, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../core/services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { AccountServices } from '../../../core/services/account-services';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe,FormsModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css'
})
export class MemberProfile implements OnInit,OnDestroy {
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    } 
  }
  // private route=inject(ActivatedRoute);
  private toast=inject(ToastService);
  // protected member=signal<Member | undefined>(undefined);
  protected memberService = inject(MemberService);
  protected accountService = inject(AccountServices);
  protected editableMember: EditableMember={
    displayName: '',
    description: '' ,
    city: '',
    country: ''
  };
  

  ngOnInit(): void {
    // this.route.parent?.data.subscribe({
    //   next: data => {
    //     this.member.set(data['member']);
    //   }
    // });

     this.editableMember={
      displayName: this.memberService.member()?.displayName || '',
      description: this.memberService.member()?.description || '' ,    
      city: this.memberService.member()?.city || '',
      country: this.memberService.member()?.country || ''
    }
  }
  
  ngOnDestroy(): void {
    if (this.memberService.editMode()) {
      this.memberService.editMode.set(false);
    }
  }

  updateProfile() {
    if (!this.memberService.member()) return;
    const updatedMember = {...this.memberService.member(), ...this.editableMember};
    this.memberService.updateMember(this.editableMember).subscribe({
      next: () => {  
        const currentUser = this.accountService.currentUser();
        if (currentUser && updatedMember.displayName !== currentUser?.displayName) {
          currentUser.displayName = updatedMember.displayName;
          this.accountService.setCurrentUser(currentUser);
        }
        console.log('Updated Member:', updatedMember);
        this.toast.success('Profile updated successfully!');
        this.memberService.editMode.set(false);
        this.memberService.member.set(updatedMember as Member);
        this.editForm?.reset(updatedMember);
      }
    })
  }

}
