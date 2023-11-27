/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-15 17:20:33
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-15 19:56:16
 * @FilePath: /userfrontend/src/components/vip/renewal/resultPage/SuccessPage.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { ResultPage, Card, Button } from 'antd-mobile'
import { useParams, useNavigate } from 'react-router-dom'

function RenewalSuccessPage() {
  const { method, amount } = useParams()
  const navigate = useNavigate()
  const details = [
    {
      label: '收款方',
      value: '好身材健身房',
      bold: true,
    },
    {
      label: '付款方式',
      value: method,
    },
    {
      label: '付款金额',
      value: amount + '元',
    },
  ]

  return (
    <ResultPage
      status='success'
      title='操作成功'
      description=
      {
        <>
          <span style={{ fontSize: 32, color: '#ffffff', marginRight: 4 }}>
            ¥
          </span>
          <span style={{ fontSize: 48, color: '#ffffff' }}>{amount}</span>
          <br />
          会员卡续费成功！
        </>
      }
      details={details}
    // secondaryButtonText='辅助操作'
    // primaryButtonText='主要操作'
    >
      <Card style={{ height: 60 }}>
        <span style={{fontSize:18,color: '#CC3C3C',fontFamily: 'ZCOOLKuaiLe'}}>{/*,fontWeight:'bold'*/}
          塑造完美身段，享受健康人生~
        </span>
      </Card>
      <div style={{ float: 'right', marginTop: 15 }}>
        <Button color="primary" onClick={() => navigate('/vip')}>返回</Button>
      </div>
    </ResultPage>
  )
}
export default RenewalSuccessPage;