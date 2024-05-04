import React, { useState, useEffect, useRef } from "react";
import "7.css/dist/7.css";
import "./style.css";
import { Rnd } from "react-rnd";

function App() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [windows, setWindows] = useState([]);
  const iconRef1 = useRef(null);
  const iconRef2 = useRef(null);

  const handleClick = (id) => {
    if (selectedIcon === id) {
      setSelectedIcon(null);
      addWindow();
    } else {
      setSelectedIcon(id);
    }
  };

  const addWindow = () => {
    if (windows.length === 0) {
      const newWindow = <Window key={windows.length} onClose={() => closeWindow(windows.length)}/>;
      setWindows([newWindow]);
    }
  };
  

  const closeWindow = (index) => {
    const updatedWindows = [...windows];
    updatedWindows.splice(index, 1);
    setWindows(updatedWindows);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        iconRef1.current &&
        !iconRef1.current.contains(event.target) &&
        iconRef2.current &&
        !iconRef2.current.contains(event.target)
      ) {
        setSelectedIcon(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="App">
      <div className="iconcontainer">
        <Icon
          id="notepad"
          isSelected={selectedIcon === "notepad"}
          onClick={() => handleClick("notepad")}
          ref={iconRef1}
        >
          <div className="picture">
            <img src="icons/notepad.png" alt="Notepad" />
          </div>
          <div className="name">
            <span>About</span>
          </div>
        </Icon>
        <Icon
          id="recycle_bin"
          isSelected={selectedIcon === "recycle_bin"}
          onClick={() => handleClick("recycle_bin")}
          ref={iconRef2}
        >
          <div className="picture">
            <img src="icons/recycle_bin.png" alt="Recycle Bin" />
          </div>
          <div className="name">
            <span>Recycle Bin</span>
          </div>
        </Icon>
      </div>
      <div className="windowcontainer">
        {windows.map((window, index) => (
          <div key={index}>{window}</div>
        ))}
      </div>
    </div>
  );
}

const Icon = React.forwardRef(({ id, isSelected, onClick, children }, ref) => {
  return (
    <i
      className={`shortcut ${isSelected ? "selected" : ""}`}
      id={id}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </i>
  );
});

const Window = ({ onClose }) => {
  return (
    <Rnd
    default={{
      x: 200,
      y: 200
    }}
    enableResizing={false}
    dragHandleClassName="title-bar"
    >
      <div class="window active">
        <div class="title-bar">
          <div class="title-bar-text">About</div>
          <div class="title-bar-controls">
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div class="window-body has-space">
          <div className="placeholder">Work in Progress...</div>
        </div>
      </div>
    </Rnd>
  );
};

export default App;