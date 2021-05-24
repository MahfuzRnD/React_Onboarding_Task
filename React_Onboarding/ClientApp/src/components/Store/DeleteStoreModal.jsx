import React, { useState, useEffect } from 'react'
import { Label, Form, Button, Header, Modal } from 'semantic-ui-react'
import axios from 'axios'

/************************************* 
 * Function to get approval to Delete the Store
 **************************************/
const DeleteStoreModal = (props) => {
    const { open, toggleDeleteModal, fetchStoreData, store } = props;


    useEffect(() => {
        console.log("UnMount a Component using Hook")
        return () => {
            console.log("UnMount a Component using Hook1")
        }
    }, [])

    /************************************* 
     * Function to Delete the Store
     **************************************/
    const deleteStore = (id) => {
        console.log("Stores:deleteStore")
        axios.delete(`/Stores/DeleteStore/${id}`)
            .then(function (res) {
                // handle success
                //console.log(res.data);
                console.log(res);
                fetchStoreData();
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
            <Modal.Header>Delete Store</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form.Field>
                        <Label as='a' color='red'>
                            Customer ID : {store.storeId},
                            Customer Name : {store.storeName},
                            Customer Address : {store.storeAddress}
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
                    onClick={() => deleteStore(store.storeId)}
                />
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteStoreModal