import React, { useState, useCallback, useEffect, ChangeEvent, useRef } from 'react'; 
import { FiCamera, FiArrowLeft, FiDollarSign, FiPackage, FiFile } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link, useLocation } from 'react-router-dom';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

import { Container, Content, AvatarInput } from './styles';

interface ProductFormData {
  name: string; 
  price: Number;
  image: string;
  image_url: string;
  description: string; 
}


const Product: React.FC = () => {
  const formRef = useRef<FormHandles>(null); 
  const { addToast } = useToast(); 
  const history = useHistory(); 
  const location = useLocation(); 
  const [product, setProduct] = useState<ProductFormData>();

  const product_id = location.search.replace('?product=', '');

  useEffect(() => {
    api.get(`products/${product_id}`).then(response =>{
        setProduct(response.data); 
        console.log(response.data); 
    });

  }, [product_id]); 

  const handleImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        data.append('image', e.target.files[0]);

        api.patch(`/products/image/${product_id}`, data).then(response => {
          history.push('/product-list');
          addToast({
            type: 'success',
            title: 'Avatar atualizado',
          });
        });
      }
    },
    [addToast, product_id, history],
  );

const handleSubmit = useCallback(async (data: ProductFormData) => {
    try {
        formRef.current?.setErrors({});
        
        const schema = Yup.object().shape({
            name: Yup.string()
                .required('Nome obrigatório'),
            price: Yup.string()
                .required('Preço obrigatório'), 
            description: Yup.string(), 
        });

        await schema.validate(data, {
            abortEarly: false, 
        }); 

        await api.put('/products', data); 
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
        <Form 
            ref={formRef} 
            onSubmit={handleSubmit}
            initialData={{ name: product?.name, price: product?.price, description: product?.description, image: product?.image_url  }}
        >

            <AvatarInput>
                <img
                    src={`https://facilmercado.s3.us-east-2.amazonaws.com/${product?.image}` ||
                      'https://facilmercado.s3.us-east-2.amazonaws.com/150.png'
                    }
                    alt={product?.name}
                />
                <label htmlFor="avatar">
                <FiCamera size={20} />
                <input
                    data-testid="input-file"
                    type="file"
                    id="avatar"
                    onChange={handleImageChange}
                />
                </label>
            </AvatarInput>

          <h1>{ product?.name }</h1>
          
          <Input name="name" icon={FiPackage} placeholder="Nome do Produto" />
          <Input name="price" icon={FiDollarSign} placeholder="Preço" />
          <Input name="description" icon={FiFile} type="description" placeholder="Descrição do Produto" />
          <Button type="submit">Alterar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Product;