import "./leftBar.scss";
import Angular from "../../assets/1.png";
import Php from "../../assets/2.png";
import JavaScript from "../../assets/3.png";
import Laravel from "../../assets/4.png";
import NodeJS from "../../assets/5.png";
import NestJS from "../../assets/6.png";
import MySql from "../../assets/7.png";
import Git from "../../assets/8.svg";
import Python from "../../assets/9.png";
import Flutter from "../../assets/10.png";
import React from "../../assets/11.png";

const LeftBar = () => {
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <span>Backend</span>
          <div className="item">
            <img src={Php} alt="" />
            <span>Php</span>
          </div>
          <div className="item">
            <img src={JavaScript} alt="" />
            <span>JavaScript</span>
          </div>
          <div className="item">
            <img src={NestJS} alt="" />
            <span>Nest JS</span>
          </div>
          <div className="item">
            <img src={Laravel} alt="" />
            <span>Laravel</span>
          </div>
          <div className="item">
            <img src={NodeJS} alt="" />
            <span>Node JS</span>
          </div>
          <div className="item">
            <img src={Python} alt="" />
            <span>Python</span>
          </div>
        </div>
      <hr/>
        <div className="menu">
          <span>Frontend</span>
          <div className="item">
            <img src={Angular} alt="" />
            <span>Angular</span>
          </div>
          <div className="item">
            <img src={React} alt="" />
            <span>React JS</span>
          </div>
        </div>
<hr />
        <div className="menu">
          <span>Movil</span>
          <div className="item">
            <img src={Flutter} alt="" />
            <span>Flutter</span>
          </div>
        </div>
<hr />
        <div className="menu">
          <span>Otros</span>
          <div className="item">
            <img src={MySql} alt="" />
            <span>MySql</span>
          </div>
          <div className="item">
            <img src={Git} alt="" />
            <span>Git</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
