/*
 * @Date: 2023-04-19 15:51:29
 * @Author: Wu Jialing
 * @LastEditTime: 2023-04-19 21:31:01
 * @FilePath: /adminfrontend/src/pages/MemberManagement/MemberList/UpdateMember/index.jsx
 * @Description: 
 */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Col, DatePicker, Form, Input, Row, message, Button } from "antd";
import { CloseCircleOutlined, CaretUpOutlined } from '@ant-design/icons';
import moment from "moment";
import dayjs from "dayjs";
import MemberServices from "../../../../services/MemberServices";
function UpdateMember() {
    const { id } = useParams()
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState()
    const [avatar, setAvatar] = useState()
    const [birthday, setBirthday] = useState()
    const [gender, setGender] = useState()
    const [height, setHeight] = useState()
    const [password, setPassword] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [registrationTime, setRegistrationTime] = useState()
    const [username, setUsername] = useState()
    const [weight, setWeight] = useState()

    const getMemberById = () => {
        MemberServices.getById(id).then(
            repsponse => {
                console.log(repsponse);
                setAddress(repsponse.data.address)
                setAvatar(repsponse.data.avatar)
                setBirthday(repsponse.data.birthday)
                setGender(repsponse.data.gender)
                setHeight(repsponse.data.height)
                setPassword(repsponse.data.password)
                setPhoneNumber(repsponse.data.phoneNumber)
                setRegistrationTime(repsponse.data.registrationTime)
                setUsername(repsponse.data.username)
                setWeight(repsponse.data.weight)
                
                form.resetFields()

            }
        ).catch(error => {
            message.error(error)
            console.log(error);
        })
    }
    useEffect(() => {
        setLoading(true)
    }, [])
    useEffect(() => {
        getMemberById()
    }, [loading])

    const updateMember = () => {
        const member = {
            id:id,
            address:address,
            avatar:avatar,
            birthday:birthday,
            gender:gender,
            height:height,
            password:password,
            phoneNumber:phoneNumber,
            registrationTime:registrationTime,
            username:username,
            weight:weight
        }
        MemberServices.updateMember(member).then(
            response=>{
                console.log("afterUpdate",response.data);
                message.success("会员信息更新成功！")
                navigate("../member-management-list")
            }
            
        ).catch(error=>{
            message.error(error.response.data)
            console.log(error);
        })
    }
    return (
        <Row>
            <Col span={4}></Col>
            <Col span={16}>
                <div style={{ fontFamily: 'serif', fontSize: '35px', textAlign: 'center', marginBottom: '40px' }}>
                    修改会员信息
                </div>
                <Form
                    form={form}
                    name="updateMemberInfo"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                    size="large"
                >
                    <Form.Item
                        label="会员昵称"
                        name="username"
                        initialValue={username}>
                        <Input onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="电话号码"
                        name='phoneNumber'
                        initialValue={phoneNumber}>
                        <Input onChange={e => { setPhoneNumber(e.target.value) }} />
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        name="gender"
                        initialValue={gender}
                    >
                        <Input onChange={e => { setGender(e.target.value) }} />
                    </Form.Item>
                    <Form.Item
                        label="生日"
                        name="birthday"
                        initialValue={dayjs(birthday, 'YYYY-MM-DD')}
                    >
                        <DatePicker onChange={(value) => {
                            let time = moment(value).format('YYYY-MM-DD')
                            setBirthday(time)
                        }} />
                    </Form.Item>
                    <Form.Item
                        label="身高"
                        name="height"
                        initialValue={height}
                    >
                        <Input onChange={e => { setHeight(e.target.value) }} />
                    </Form.Item>
                    <Form.Item
                        label="体重"
                        name="weight"
                        initialValue={weight}
                    >
                        <Input onChange={e => { setWeight(e.target.value) }} />
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="address"
                        initialValue={address}
                    >
                        <Input onChange={e => { setAddress(e.target.value) }} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                        style={{
                            marginTop: '30px'
                        }}
                    >
                        <Button type="primary" onClick={(e) => updateMember()} icon={<CaretUpOutlined />}>
                            提交
                        </Button>

                        <Button type="danger" onClick={() => { navigate("../member-management-list") }} style={{ marginLeft: "160px" }} icon={<CloseCircleOutlined />}>
                            关闭
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={4}></Col>
        </Row>

    );
}

export default UpdateMember;