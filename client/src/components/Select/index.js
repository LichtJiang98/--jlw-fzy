import React, { useEffect, useRef, useState, memo } from "react";
import { Dropdown, Selector, Button, CheckList, TreeSelect } from "antd-mobile";

import axios from "axios";
import "./index.css";
import userEvent from "@testing-library/user-event";

const SelectBar = (props) => {
  const { getSelect, getPosition, getChoose, tinybar, fatherValue } = props;

  const [selectData, setSelectdata] = React.useState("");
  const [positionData, setPositiondata] = React.useState("");
  const [sortData, setSortdata] = React.useState("");
  const [sonValue, setSonvalue] = React.useState(["A", "A1"]);
  const [scrollTop, setScrolltop] = React.useState(0);

  useEffect(() => {
    //get请求

    axios.get("/mock/select").then((res) => {
      setSelectdata(res.data.data);
    });
    axios.get("/mock/position").then((res) => {
      setPositiondata(res.data);
      // console.log(positionData.data)
    });
    axios.get("/mock/sort").then((res) => {
      console.log(res);
      setSortdata(res.data.data.list);
    });

    window.addEventListener("scroll", bindHandleScroll);
    return () => {
      window.removeEventListener('scroll', bindHandleScroll)
    }
  }, []);


  const bindHandleScroll = (e) => {
    const scrollTop =
      (e.srcElement ? e.srcElement.documentElement.scrollTop : false) ||
      (e.srcElement ? e.srcElement.body.scrollTop : 0);
      console.log(scrollTop)
    setScrolltop(scrollTop);
  };

  useEffect(() => {
    if (tinybar == "500米以内" || tinybar == "上海大学") {
      setOption(tinybar);
      getPosition(tinybar);
    } else if (tinybar == "距离最近") {
      setItemvalue(tinybar);
      getSelect(tinybar);
    } else if (tinybar == "不限") {
      setOption(tinybar);
      getPosition(tinybar);
      // setDefaultvalue(['A','A1'])
    } else if (tinybar == "智能排序") {
      console.log(tinybar);
      setItemvalue(tinybar);
      getSelect(tinybar);
    }
    // console.log(tinybar)
  }, [tinybar]);

  useEffect(() => {
    if (fatherValue == "不限") {
      setSonvalue(["A", "A1"]);
    }
  }, [fatherValue]);

  const [flag, setFlag] = React.useState(0);
  const [chooseValue, setChoosevalue] = React.useState("");

  //智能排序栏的初始化
  const [itemValue, setItemvalue] = React.useState("智能排序");
  const ref = useRef(null);

  //位置栏的初始化
  const [option, setOption] = React.useState("位置");

  //给下拉框绑定点击事件
  const changeItem = (e) => {
    let val = e.target.innerHTML;
    getSelect(val);
    setItemvalue(val);
  };

  //点击了导航栏就将其置顶
  const test = () => {
    if (scrollTop < 118) {
      document.body.scrollTop = document.documentElement.scrollTop = 118; //获取当前滚动条位置增加speed变量高度
    }
  };

  const handleValue = (value) => {
    if (chooseValue == []) {
      setChoosevalue(value);
      //如果已经有value值了那就拼接
    } else {
      let res = Array.from(new Set(chooseValue.concat(value)));
      setChoosevalue(res);
    }
  };

  const handlePosition = (value, label) => {
    setSonvalue(value);
    if (value.length == 2) {
      let val = label.options[1].label;
      setOption(val);
      getPosition(val);
    } else {
      console.log("下拉框");
    }
  };

  return (
    <div
      className="dropdownBar"
      onClick={test}
      style={
        scrollTop < 118
          ? {
              position: "relative",
              width: "375px",
              zIndex: 1000,
            }
          : { position: "fixed", top: "45px", zIndex: 1000 }
      }
    >
      <Dropdown
        ref={ref}
        className="dropdown"
        style={{ width: "375px", zIndex: 1000 }}
      >
        <Dropdown.Item key="sorter" title={option}>
          <div className="level-box">
            <TreeSelect
              defaultValue={["A", "A1"]}
              value={sonValue}
              options={positionData.data}
              onChange={(value, label) => {
                handlePosition(value, label);
              }}
            />
          </div>
        </Dropdown.Item>
        <Dropdown.Item key="bizop" title={itemValue}>
          <div className="level-box" style={{ padding: 12 }}>
            <CheckList
              style={{
                "--border-top": "solid 0px var(--adm-color-border)",
                fontSize: "14px",
              }}
            >
              {sortData == ""
                ? null
                : sortData.map((item) => (
                    <CheckList.Item
                      value={item.name}
                      style={{ fontSize: "14px" }}
                      onClick={changeItem}
                      key={item.id}
                    >
                      {item.name}
                    </CheckList.Item>
                  ))}
            </CheckList>
          </div>
        </Dropdown.Item>
        <Dropdown.Item
          key="more"
          title="更多筛选"
          onClick={(e) => console.log(e)}
        >
          <div className="level-box" style={{ padding: 12, height: "370px" }}>
            {selectData == ""
              ? null
              : selectData.map((item) => (
                  <div className="level" key={item.children.id}>
                    <div style={{ fontSize: 14, marginBottom: 10 }}>
                      {item.name}
                    </div>
                    <Selector
                      style={{
                        fontSize: 12,
                        "--checked-color": "rgba(44, 90, 44, 0.5)",
                        "--checked-text-color": "white",
                      }}
                      columns={3}
                      options={item.children}
                      value={chooseValue}
                      multiple={true}
                      onChange={setChoosevalue}
                      onClick={(value) => handleValue(value)}
                    />
                  </div>
                ))}
            <div className="button-box">
              <Button
                style={{ width: 150, borderRadius: 0, fontSize: "16px" }}
                onClick={() => {
                  ref.current?.close();
                  setChoosevalue([]);
                  getChoose([]);
                }}
              >
                重置
              </Button>
              <Button
                style={{
                  width: 150,
                  right: -50,
                  borderRadius: 0,
                  fontSize: "16px",
                  "--background-color": "rgba(44, 90, 44, 0.6)",
                  color: "white",
                }}
                onClick={() => {
                  ref.current?.close();
                  getChoose(chooseValue);
                }}
              >
                确定
              </Button>
            </div>
          </div>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default SelectBar;
