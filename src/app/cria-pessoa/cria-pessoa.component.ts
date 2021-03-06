import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Pessoa } from '../pessoa';
import { PessoaService } from '../pessoa.service';
import { Endereco } from '../endereco';
import { hiddenEndereco } from '../util/hiddenEndereco';

@Component({
  selector: 'app-cria-pessoa',
  templateUrl: './cria-pessoa.component.html',
  styleUrls: ['./cria-pessoa.component.css']
})
export class CriaPessoaComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  endereco: Endereco = new Endereco();
  submitted = false;
  hidden = hiddenEndereco() === 1;

  constructor(
    private pessoaServicxe: PessoaService,
    private router: Router) { }

  ngOnInit() { }

  newPessoa(): void {
    this.submitted = false;
    this.pessoa = new Pessoa();

    if (!this.hidden) this.endereco = new Endereco();
  }

  save() {
    if (!this.hidden) this.pessoa.endereco = this.endereco;
    this.pessoa.dataNascimento = moment(this.pessoa.dataNascimento).format('YYYY-MM-DD')

    this.pessoaServicxe.criaPessoa(this.pessoa)
      .subscribe(data => console.log(data), error => console.log(error));
    this.pessoa = new Pessoa();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/people']);
  }
}
