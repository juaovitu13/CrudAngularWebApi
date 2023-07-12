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
  tituloFormulario: string | undefined;
  carros: Carro[] | undefined;
  nomeCarro: string | undefined;
  carroId: number | undefined;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false; 
  
  modalRef: BsModalRef | undefined;

  constructor(private carrosService: CarrosService,
    private modalService: BsModalService) {}

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

  ExibirFormularioAtualizacao(carroId: number): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.carrosService.ObterPorId(carroId).subscribe((resultado) => {
      this.tituloFormulario = `Atualizar ${resultado.Marca} ${resultado.Modelo}`;

      this.formulario = new FormGroup({
        carroId: new FormControl(resultado.Id),
        marca: new FormControl(resultado.Marca),
        modelo: new FormControl(resultado.Modelo),
        ano: new FormControl(resultado.Ano),
        cor: new FormControl(resultado.Cor),
        placa: new FormControl(resultado.Placa),
      });
    });
  }

  EnviarFormulario(): void {
    const carro: Carro = this.formulario.value;

    if (carro.carroId > 0) {
      this.carrosService.Atualizar(carro).subscribe((resultado) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Carro atualizado com sucesso');
        this.carrosService.ObterTodos().subscribe((registros) => {
          this.carros = registros;
        });
      });
    } else {
      this.carrosService.Atualizar(carro).subscribe((resultado) => {
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

  ExibirConfirmacaoExclusao(conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.nomeCarro = this.nomeCarro;
  }

  ExcluirCarro(carroId: any) {
    this.carrosService.ExcluirCarro(carroId).subscribe(resultado => {
      this.modalRef?.hide();
      alert('Carro excluído com sucesso');
      this.carrosService.ObterTodos().subscribe(registros => {
        this.carros = registros;
      });
    });
  }

}
