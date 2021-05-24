import React, { useState, useEffect } from 'react'
import { Label, Form, Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'

/************************************* 
 * Function to get approval to Delete the Product
 **************************************/
const DeleteProductModal = (props) => {
    const { open, toggleDeleteModal, fetchProductData, product } = props;

    useEffect(() => {
        console.log("UnMount a Component using Hook")
        return () => {
            console.log("UnMount a Component using Hook1")
        }
    }, [])

    /************************************* 
    * Function to Delete the Product
    **************************************/
    const deleteProduct = (id) => {
        console.log("Products:deleteProduct")
        axios.delete(`/Products/DeleteProduct/${id}`)
            .then(function (res) {
                // handle success
                console.log(res);
                fetchProductData();
                toggleDeleteModal();
            })
            .catch(function (err) {
                // handle error

                console.log(err);
                toggleDeleteModal();
            })

    }

    /************************************* 
     * Using Semantic UI Modal & ribbon Labels as UI
     **************************************/
     return (
        <Modal open={open}>
            <Modal.Header>Delete Product</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form.Field>
                        <Label as='a' color='red'>
                            Product ID : {product.productId},
                            Product Name : {product.productName},
                            Product Price : {product.productPrice}
                        </Label>
                    </Form.Field>
                    <br /><br />
                    <footer align='center'>Are you sure?</footer>
                </Modal.Description>
            </Modal.Content>

            <Modal.Actions>
                <Button color="black" onClick={() => toggleDeleteModal()}>
                    Cancel
                </Button>
                <Button
                    color="red"
                    content="Delete"
                    labelPosition="right"
                    icon="x"
                    onClick={() => deleteProduct(product.productId)}
                />
            </Modal.Actions>
        </Modal>
    );
}

export default DeleteProductModal