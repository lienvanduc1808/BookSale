import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, allUsers } from '../../actions/userActions'
import Sidebar from './Sidebar'
//import { DELETE_ORDER_RESET } from '../../constants/userConstants'

const UsersList = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, users } = useSelector(state => state.allUsers)
    //const { isDeleted } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(allUsers())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        // if (isDeleted) {
        //     alert.success('Xóa đơn hàng thành công')
        //     history.push('/admin/orders')
        //     dispatch({ type: DELETE_ORDER_RESET })
        // }

    }, [dispatch, alert, error])

    // const deleteOrderHandler = (id) => {
    //     dispatch(deleteOrder(id))
    // }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'ID tài khoản',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Tên',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Vai trò',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Chức năng',
                    field: 'actions',
                }
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions: <Fragment>
                    <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2">
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })
        return data
    }
    return (
        <Fragment>
            <MetaData title={'Tất cả tài khoản'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">
                            Tất cả tài khoản
                        </h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setUsers()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )
                        }
                    </Fragment>
                </div>
            </div>
        </Fragment>

    )
}

export default UsersList