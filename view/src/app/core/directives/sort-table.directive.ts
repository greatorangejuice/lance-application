import { Directive, Input, OnInit } from '@angular/core';

@Directive({ selector: '[appSort]' })
export class SortTableDirective implements OnInit {
  @Input('searchParameter') searchParameter!: string;
  constructor() {}

  ngOnInit(): void {}
}
