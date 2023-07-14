import { Carro } from 'src/app/Carro';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CarrosService } from './../../carros.service';


@Component({
  selector: 'app-carros',
  templateUrl: './carros.component.html',
  styleUrls: ['./carros.component.css']
})
export class CarrosComponent implements OnInit {

  formulario: any;
  tituloFormulario!: string;
  carros: Carro[] = [];
  nomeCarro!: string;
  id!: number;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;
  
  modalRef: BsModalRef | undefined;

  constructor(private carrosService: CarrosService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.carrosService.ObterTodos().subscribe((resultado) => {
      this.carros = resultado;
    });
  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Novo Carro';
    this.formulario = new FormGroup({
      marca: new FormControl(null),
      modelo: new FormControl(null),
      ano: new FormControl(null),
      cor: new FormControl(null),
      placa: new FormControl(null),
    });
  }

  ExibirFormularioAtualizacao(id: number): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.carrosService.ObterPorId(id).subscribe((resultado) => {
      this.tituloFormulario = `Atualizar ${resultado.marca} ${resultado.modelo}`;

      this.formulario = new FormGroup({
        id: new FormControl(resultado.id),
        marca: new FormControl(resultado.marca),
        modelo: new FormControl(resultado.modelo),
        ano: new FormControl(resultado.ano),
        cor: new FormControl(resultado.cor),
        placa: new FormControl(resultado.placa),
      });
    });
  }

  EnviarFormulario(): void {
    const carro: Carro = this.formulario.value;

    if (carro.id > 0) {
      this.carrosService.Atualizar(carro).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Carro atualizado com sucesso');
        this.carrosService.ObterTodos().subscribe((registros) => {
          this.carros = registros;
        });
      });
    } else {
      this.carrosService.Salvar(carro).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Carro inserido com sucesso');
        this.carrosService.ObterTodos().subscribe((registros) => {
          this.carros = registros;
        });
      });
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(id: number, nomeCarro: string, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.id = id;
    this.nomeCarro = nomeCarro;
  }

  ExcluirCarro(id : number) {
    this.carrosService.ExcluirCarro(id).subscribe(resultado => {
      this.modalRef?.hide();
      alert('Carro excluído com sucesso');
      this.carrosService.ObterTodos().subscribe(registros => {
        this.carros = registros;
      });
    });
  }

}

