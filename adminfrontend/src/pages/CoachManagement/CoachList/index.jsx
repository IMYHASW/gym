import React, { useEffect, useState } from 'react'
import { Button, Space, Table, message, Popconfirm } from 'antd';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import '../coach.css'
import CoachService from '../../../services/CoachService';
import moment from 'moment';

function CoachList() {

  const [coach, setCoach] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  const getAll = () => {
    CoachService.getAll().then((response) => {
      setCoach(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    getAll();
  },[location])

  const deleteCoach = (e) => {
    console.log(e);
    message.success('Delete Success!');
    setTimeout(() => {
      CoachService.delete(e).then(response => {
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
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
      align: 'center',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
    },
    {
      title: '出生日期',
      dataIndex: 'birth',
      key: 'birth',
      align: 'center',
    },
    {
      title: '工龄',
      dataIndex: 'workingYears',
      key: 'workingYears',
      align: 'center',
    },
    {
      title: '相关评价',
      key: 'evaluation',
      dataIndex: 'evaluation',
      align: 'center',
    },
    {
      title: '入职日期',
      dataIndex: 'entryDate',
      key: 'entryDate',
      align: 'center',
    },
    {
      title: '操作',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
            <Button type='primary' onClick={()=>{navigate("../update-coach/" + record.key)}} icon={<EditOutlined />}>
              编辑
            </Button>
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => deleteCoach(record.key)}
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
  const data = coach.map((coach) => {

    return {
      key: coach.id,
      username: coach.username,
      gender: coach.gender,
      birth: moment(coach.birth).format("YYYY-MM-DD"),
      workingYears: coach.workingYears,
      evaluation: coach.evaluation,
      entryDate: moment(coach.entryDate).format("YYYY-MM-DD HH:mm:ss"),
    }
  })

  return (
    <div className='emplst'>
      <div className="title">教练列表</div>
      <Table columns={columns} dataSource={data} 
      // bordered={true} 
      />
    </div>
  );
}

export default CoachList;