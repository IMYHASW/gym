import React, { useEffect, useState } from 'react'
import { Button, Space, Table, message, Popconfirm } from 'antd';
import { Link, useNavigate,useLocation  } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './../equipment.css'
import EquipmentService from '../../../services/EquipmentService';
import moment from 'moment';
function EquipmentList() {

  const [equipment, setEquipment] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  const getAll = () => {
    EquipmentService.getAll().then((response) => {
      setEquipment(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    getAll();
  },[location])

  const deleteEquipment = (e) => {
    console.log(e);
    message.success('Delete Success!');
    setTimeout(() => {
      EquipmentService.delete(e).then(response => {
        getAll();
      }).catch(error => {
        console.log(error);
      })
    }, 500);
  }

  const cancel = (e) => {
    console.log(e);
    message.error('Delete Failed!');
  };

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <Link to={'../equipment-management-record/' + record.key}>{text}</Link>,
      align: 'center',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
      align: 'center',
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
      align: 'center',
    },
    {
      title: '购买时间',
      key: 'purchaseTime',
      dataIndex: 'purchaseTime',
      align: 'center',
    },
    {
      title: '设备状态',
      dataIndex: 'equipmentStatus',
      key: 'equipmentStatus',
      align: 'center',
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button type='primary' onClick={()=>{navigate("../equipment-management-update/"+ record.key)}} icon={<EditOutlined />}>
           编辑
          </Button>
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => deleteEquipment(record.key)}
            onCancel={cancel}
            okText="删除"
            cancelText="取消"
          >
            <Button type='danger' icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const data = equipment.map((equipment) => {

    return {
      key: equipment.id,
      id: equipment.id,
      name: equipment.name,
      model: equipment.model,
      brand: equipment.brand,
      purchaseTime: equipment.purchaseTime,
      equipmentStatus: equipment.equipmentStatus,
    }
  })

  return (
    <div className='emplst'>
      <div className="title">器材列表</div>
      <Table columns={columns} dataSource={data} 
      bordered={true} />
    </div>
  );
}

export default EquipmentList;