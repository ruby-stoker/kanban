import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateKanbanComponent } from './candidate-kanban.component';
import {FilterByFieldPipe} from '../../pipe/filter-by-field.pipe';
import {SafePipe} from '../../pipe/safe.pipe';
import {By} from '@angular/platform-browser';
import {getUsers} from '../../data-faker/data/user';

describe('CandidateKanbanComponent', () => {
  let component: CandidateKanbanComponent;
  let fixture: ComponentFixture<CandidateKanbanComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateKanbanComponent, FilterByFieldPipe, SafePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateKanbanComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show without candidate', () => {
    expect(compiled.query(By.css('.kanban-wrap'))).toBeNull();
  });

  describe('with candidate', () => {
    beforeEach(async(() => {
      component.candidates = getUsers(5);
      component.typeStatus = ['Phone interview', '1st Stage', 'Assesment', 'Final', 'Hire'];
      fixture.detectChanges();
    }));

    it('should show', () => {
      expect(compiled.query(By.css('.kanban-wrap')).nativeElement).toBeTruthy();
    });

    it('should have name', () => {
      expect(compiled.query(By.css('.list-user__data-name')).nativeElement).toBeTruthy();
    });

    it('should show block candidate date of interview', () => {
      expect(compiled.query(By.css('.candidate__data-inter')).nativeElement).toBeTruthy();
    });
  });
});
