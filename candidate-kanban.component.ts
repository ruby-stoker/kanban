import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CandidateFull} from '../../models/interface/full-candidate';

@Component({
  selector: 'app-candidate-kanban',
  templateUrl: './candidate-kanban.component.html',
  styleUrls: ['./candidate-kanban.component.scss']
})
export class CandidateKanbanComponent {
  dragItem: number;
  dragHTML: HTMLElement;
  draggableOnScroll = true;
  private _scroll = { width: 0, x: 0 };

  @Input() candidates: CandidateFull[];
  @Input() typeStatus: string[];
  @Output() showCandidate = new EventEmitter();

  constructor() { }

  dragStart(ev, id) {
    this.dragHTML = ev.currentTarget.parentNode;
    this.dragItem = id;
  }

  dragEnd() {
    this.dragItem = null;
    this.dragHTML = undefined;
  }

  dragOver(ev) {
    if (this.draggableOnScroll) {
      ev.preventDefault();
      ev.stopPropagation();
      const element = ev.currentTarget;
      if (!(element.classList.value).includes('drag')) {
        element.classList.add('hoverToggle');
      }
    }
  }

  dragOverWrap(ev) {
    if (this.draggableOnScroll) {
      ev.preventDefault();
      ev.stopPropagation();
      const candidateList = ev.currentTarget.getElementsByClassName('candidate')[0];
      candidateList.classList.add('hoverToggle');
    }
  }

  dragLeave(ev) {
    const element = ev.currentTarget;
    setTimeout(() => element.classList.remove('hoverToggle'), 20);
  }

  dragLeaveWrap(ev) {
    const candidateList = ev.currentTarget.getElementsByClassName('candidate')[0];
    setTimeout(() => candidateList.classList.remove('hoverToggle'), 20);
  }

  drop(ev) {
    if (this.draggableOnScroll) {
      ev.stopPropagation();
      const candidateList = ev.currentTarget.parentNode;
      ev.currentTarget.classList.remove('hoverToggle');
      candidateList.insertBefore(this.dragHTML, ev.currentTarget.nextSibling);
      this.changeCandidate(candidateList);
    }
  }

  dropWrap(ev) {
    if (this.draggableOnScroll) {
      ev.stopPropagation();
      const candidateList = ev.currentTarget.getElementsByClassName('candidate')[0];
      candidateList.classList.remove('hoverToggle');
      candidateList.appendChild(this.dragHTML);
      this.changeCandidate(candidateList);
    }
  }

  dragStartMove(ev) {
    const crt = ev.currentTarget.cloneNode(true);
    ev.dataTransfer.setDragImage(crt, 0, 0);
    this._scroll.width = ev.currentTarget.scrollWidth;
    this._scroll.x = ev.clientX;
    this.draggableOnScroll = false;
  }

  dragMove(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (ev.clientX > this._scroll.x) {
      ev.currentTarget.scrollLeft = ev.currentTarget.scrollLeft + 6;
      this._scroll.x = ev.clientX;
    } else if (ev.clientX < this._scroll.x) {
      ev.currentTarget.scrollLeft = ev.currentTarget.scrollLeft - 6;
      this._scroll.x = ev.clientX;
    }
  }

  finishMove() {
    this.draggableOnScroll = true;
  }

  private changeCandidate(candidateList) {
    for (let i = 0; i < this.candidates.length; i++) {
      if (this.candidates[i].id === this.dragItem) {
        this.candidates[i].statusInSchemes = candidateList.getAttribute('data-type');
      }
    }
  }

  detailCandidate(candidate) {
    this.showCandidate.emit(candidate);
  }
}
