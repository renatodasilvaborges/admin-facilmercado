import React, { useState, useEffect } from 'react'; 
import 'react-day-picker/lib/style.css'; 

import { 
    Container, 
    Content, 
    List, 
    SectionButton, 
    Section,
    Product

} from './styles'; 

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

interface Product {
    id: string;
    provider_id: string;
    name: string; 
    price: Number;
    image: string;
    image_url: string;
    description: string; 
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get('products').then(response =>{
            setProducts(response.data); 
        });
    }, []); 

    return (
        <Container>
            <header>
                <div>
                <Link to="/dashboard">
                    <FiArrowLeft size={32} />
                </Link>
                </div>
            </header>           
        
            <Content>
                <List>  
                    <h1>Lista de Produtos</h1>

                    <Section>
                            {products?.length === 0 && (
                                <p>Nenhum produto foi cadastrado ainda</p>
                            )}

                            {products?.map(product => (
                                    <Link to={`/product-detail/?product=${product.id}`}>
                                    <Product key={product.id}>
                                        <span>
                                            R$ 
                                            {product.price}
                                        </span>
                                        <div>
                                            <img
                                                src={
                                                    product.image_url || 
                                                    'https://facilmercado.s3.us-east-2.amazonaws.com/150.png'
                                                }
                                                alt={product.name}
                                            />
                                            <strong>{product.name}</strong>
                                        </div>
                                    </Product>
                                </Link>
                            ))}
                    </Section>

                </List>

                <SectionButton>
                    <Link to='/product'>
                        <Button>Cadastrar Produto</Button>
                    </Link>
                </SectionButton>
            </Content>

        </Container>
    );
};
export default ProductList; 