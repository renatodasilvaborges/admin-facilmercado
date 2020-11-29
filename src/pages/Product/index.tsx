import React, { useCallback, useRef } from 'react';
import {  FiArrowLeft, FiDollarSign, FiPackage, FiFile } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

import { Container, Content } from './styles';

interface ProductFormData {
  name: string; 
  price: Number;
  image: string;
  description: string; 
}


const Product: React.FC = () => {
  const formRef = useRef<FormHandles>(null); 
  const { addToast } = useToast(); 
  const history = useHistory(); 

  const handleSubmit = useCallback(async (data: ProductFormData) => {
      try {
          formRef.current?.setErrors({});
          
          const schema = Yup.object().shape({
              name: Yup.string()
                  .required('Nome obrigatório'),
              price: Yup.number()
                  .required('Preço obrigatório'), 
              description: Yup.string(), 
          });

          await schema.validate(data, {
              abortEarly: false, 
          }); 

          await api.post('/products', data); 
          history.push('/product-list'); 

          addToast({
              type: 'success',
              title: 'Cadastro realizado com sucesso!',
              description: 'O seu produto já está disponível no APP!',
          });

      } catch (err) {

          if(err instanceof Yup.ValidationError) {
              const errors = getValidationErrors(err); 
              formRef.current?.setErrors(errors);
              return; 
          }   

          addToast({
              type: 'error', 
              title: 'Erro no Cadastro', 
              description: 'Ocorreu um erro ao fazer o cadastro, tente novamente', 
          }); 

      }
  }, [addToast, history]); 

  return (
    <Container>
      <header>
        <div>
          <Link to="/product-list">
            <FiArrowLeft size={32} />
          </Link>
        </div>
      </header>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>

          <h1>Faça o Cadastro do Seu Produto </h1>
          
          <Input name="name" icon={FiPackage} placeholder="Nome do Produto" />
          <Input name="price" icon={FiDollarSign} placeholder="Preço" />
          <Input name="description" icon={FiFile} type="description" placeholder="Descrição do Produto" />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Product;