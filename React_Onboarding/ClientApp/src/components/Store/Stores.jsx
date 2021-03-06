import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button, Pagination, Icon, Menu } from 'semantic-ui-react';
import AddNewStore from './AddNewStore';
import DeleteStoreModal from './DeleteStoreModal';
import UpdateStoreModal from './UpdateStoreModal';

/************************************* 
 * Class to CURD the Store data
 **************************************/
export class Stores extends Component {
    static displayName = Stores.name;

    /***********************Constructor************/
    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            loaded: false,
            openCreateModal: false,
            openDeleteModal: false,
            openUpdateModal: false,
            store: {},
            totalStoresRec: 0,
            currentPage: 1,
            totalPage: 1
        };
        this.fetchStoreData = this.fetchStoreData.bind(this);
    }


    /************************************* 
     * Function to Add/Create the Store
     **************************************/
    fetchStoreData() {
        console.log("Stores:fetchStoreData")
        axios.get(`/Stores/GetStore`)
            .then((res) => {
                // handle success
                console.log(res.data);
                this.setState({
                    Store: res.data,
                    loaded: true,
                    totalStoresRec: res.data.length,
                    totalPage: Math.ceil(res.data.length / 4)
                })
                /* To fix the last Page Refresh on Delete to move to previous page */
                if (((res.data.length % 4) === 0) && (this.state.currentPage > Math.ceil(res.data.length / 4))) {
                    console.log("Last Page= Current Page");
                    this.setState({
                        currentPage: (this.state.currentPage === 1) ? 1 : this.state.currentPage - 1
                    })

                }
            })
            .catch((err) => {
                // handle error
                console.log(err);
                this.setState({ loaded: false })
            })
            .then(() => {
                // always executed
                console.log("Always Executed");
            });

    }

    /************************************************************* 
     * Functions to Learn about the life Cycle of React components
     *************************************************************/
    componentDidMount() {
        console.log("Stores:componentDidMount");

        this.fetchStoreData();
    }

    /************************************************************* 
     * Functions to  toggle the status of openCreateModal between true and false
     * to Open or notopen the Modal(Child Component AddNewStore)
     *************************************************************/
    toggleCreateModal = () => {
        this.setState({ openCreateModal: !this.state.openCreateModal })
        console.log("Stores:toggleCreateModal")
    }

    /************************************************************* 
     * Functions to  toggle the status of openDeleteModal between true and false
     * to Open or notopen the Modal(Child Component DeleteStoreModal)
     *************************************************************/

    toggleDeleteModal = () => {
        this.setState({
            openDeleteModal: !this.state.openDeleteModal
        })

        console.log("Stores:toggleDeleteModal")

    }


    /************************************************************* 
     * Functions setStateDeleteModal  copy the Store Row to customer variable which can be passed to
     *  the DeleteStoreModal(Child Component )
     *************************************************************/
    setStateDeleteModal = (store) => {
        this.setState({ store: store })
        console.log("Stores:setStateDeleteModal:Name: " + store.name + " address: " + store.address);
        this.toggleDeleteModal();
    }

    /************************************************************* 
    * Functions to  toggle the status of openUpdateModal between true and false
    * to Open or notopen the Modal(Child Component UpdateStoreModal)
    *************************************************************/
    toggleUpdateModal = () => {
        this.setState({
            openUpdateModal: !this.state.openUpdateModal
        })

        console.log("Stores:toggleUpdateModal:" + this.state.openUpdateModal)

    }

    /************************************************************* 
  * Functions setStateUpdateModal copy the Store Row to customer variable which can be passed to
  *  the UpdateStoreModal(Child Component )
  *************************************************************/
    setStateUpdateModal = (store) => {
        this.setState({ store: store })
        console.log("Stores:setStateUpdateModal:Name: " + store.name + " address: " + store.address);
        this.toggleUpdateModal();
    }
    /************************************************************* 
       * Functions pageChange set the Pagination attributes
       *************************************************************/
    pageChange = (e, pagData) => {
        this.setState({ currentPage: pagData.activePage, totalPage: pagData.totalPages })
        console.log(pagData);
        console.log("Customers:pageChange:Saleid: Product id: Store id: Sale Time: ");
    }

    /************************************* 
     * Using Semantic UI Modal & Form  as UI
     **************************************/
    render() {
        console.log("Stores:render");
        const Store = this.state.Store;
        const loaded = this.state.loaded;
        const openCreateModal = this.state.openCreateModal;
        const openDeleteModal = this.state.openDeleteModal;
        const openUpdateModal = this.state.openUpdateModal;
        const store = this.state.store;
        const totalStoresRec = this.state.totalStoresRec;
        const currentPage = this.state.currentPage;

        console.log("Stores:render:Name: " + store.storeName + " address: " + store.storeAddress);
        if (loaded) {
            return (
                <div>
                    <AddNewStore
                        open={openCreateModal}
                        toggleCreateModal={() => this.toggleCreateModal()}
                        fetchStoreData={() => this.fetchStoreData()}
                        name={store.name} />

                    <DeleteStoreModal
                        open={openDeleteModal}
                        toggleDeleteModal={() => this.toggleDeleteModal()}
                        fetchStoreData={() => this.fetchStoreData()}
                        store={store} />

                    <UpdateStoreModal
                        open={openUpdateModal}
                        toggleUpdateModal={() => this.toggleUpdateModal()}
                        fetchStoreData={() => this.fetchStoreData()}
                        store={store} />
                    <h1> S T O R E S .......</h1>
                    <Button color='blue' content='Add New Store' onClick={this.toggleCreateModal} />
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Store Name</Table.HeaderCell>
                                <Table.HeaderCell>Store Address</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                                <Table.HeaderCell>Actions</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {Store.map((s, index) => {
                                if ((index >= ((currentPage * 4) - 4)) && (index < (currentPage * 4))) {
                                    console.log("inside if:" + index)

                                    return (
                                        <Table.Row key={s.storeId}>

                                            <Table.Cell>{s.storeName}</Table.Cell>
                                            <Table.Cell>{s.storeAddress}</Table.Cell>
                                            <Table.Cell>
                                                <Button color='yellow' icon labelPosition='left'
                                                    onClick={() => this.setStateUpdateModal(s)}>
                                                    <Icon name='edit outline' />
                                            Edit</Button>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button color='red' icon labelPosition='left'
                                                    onClick={() => this.setStateDeleteModal(s)}>
                                                    <Icon name='trash alternate' />
                                            Delete</Button>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                }
                            })}
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>

                                    {currentPage}

                                    <Menu floated='right'>
                                        <Pagination
                                            activePage={currentPage}
                                            ellipsisItem={null}
                                            firstItem={null}
                                            lastItem={null}
                                            siblingRange={0}
                                            totalPages={Math.ceil(totalStoresRec / 4)}
                                            onPageChange={(e, pageData) => this.pageChange(e, pageData)}
                                        />

                                    </Menu>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </div>
            );
        } else {
            return (
                <div>
                    <h2> L O A D I N G .....</h2>
                </div>);
        }
    }
}