import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeTwoTone } from "@ant-design/icons";

export default function Bread(props) {
  const item = props.item;
  const { pathname } = useLocation();
  const [firstBread, setFirstBread] = useState("");
  const [secondBread, setSecondBread] = useState("");

  useEffect(() => {
    let secondPath = pathname.split("/")[3];
    let firstPath = pathname.split("/")[2];
    setSecondBread(secondPath);
    setFirstBread(firstPath);
    console.log("@Bread-useEffect:pathname", pathname);
  }, [pathname]);

  const getFirstBread = () => {
    return item
      .filter((item) => {
        return item.key === firstBread;
      })
      .map((item) => {
        return item.label;
      });
  };

  const getSecondBread = () => {
    return item
      .filter((item) => {
        return item.key === firstBread;
      })[0]
      ?.children.filter((item) => {
        return item.key === secondBread;
      })
      .map((item) => {
        return item.label;
      });
  };

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item href="">
        <HomeTwoTone />
      </Breadcrumb.Item>
      <Breadcrumb.Item>{getFirstBread()}</Breadcrumb.Item>
      <Breadcrumb.Item>{getSecondBread()}</Breadcrumb.Item>
    </Breadcrumb>
  );
}
