import React, { useState, useEffect, useRef } from "react";
import "7.css/dist/7.css";
import "./style.css";
import { Rnd } from "react-rnd";
import useSound from 'use-sound';
import clicksound from './assets/sounds/click.mp3';

function App() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [windows, setWindows] = useState([]);
  const iconRef1 = useRef(null);
  const iconRef2 = useRef(null);
  const iconRef3 = useRef(null);
  const iconRef4 = useRef(null);
  const iconRef5 = useRef(null);
  const iconRef6 = useRef(null);
  const [clickVolume, setClickVolume] = useState(0);
  const [playClick] = useSound(clicksound, { volume: clickVolume });
  const [openWindows, setOpenWindows] = useState({});

  const handleVolumeChange = (volume) => {
    setClickVolume(volume);
  };

  const handleClick = (id) => {
    if (selectedIcon === id) {
      if (id === "notepad") {
        if (!openWindows["about"]) {
          addAboutWindow();
        }
      } else if (id === "recyclebin") {
        handleRecycleBin();
      } else if (id === "virtualpet") {
        if (!openWindows["pet"]) {
          addPetWindow();
        }
      } else if (id === "soundpanel") {
        if (!openWindows["sound"]) {
          addSoundWindow();
        }
      } else if (id === "chat") {
        if (!openWindows["chat"]) {
          addChatWindow();
        }
      } else if (id === "internet") {
        if (!openWindows["internet"]) {
          addInternetWindow();
        }
      }
    } else {
      setSelectedIcon(id);
    }
  };

  const addAboutWindow = () => {
    const newWindow = <AboutWindow key={windows.length} onClose={() => closeWindow("about")} />;
    setWindows([...windows, newWindow]);
    setOpenWindows({ ...openWindows, about: true });
    console.log("openWindows after adding about window:", openWindows);
  };

  const addPetWindow = () => {
    const newWindow = <PetWindow key={windows.length} onClose={() => closeWindow("pet")} />;
    setWindows([...windows, newWindow]);
    setOpenWindows({ ...openWindows, pet: true });
    console.log("openWindows after adding pet window:", openWindows);
  };

  const addSoundWindow = () => {
    const newWindow = <SoundWindow key={windows.length} clickVolume={clickVolume} setClickVolume={handleVolumeChange} onClose={() => closeWindow("sound")} />;
    setWindows([...windows, newWindow]);
    setOpenWindows({ ...openWindows, sound: true });
    console.log("openWindows after adding sound window:", openWindows);
  };

  const addChatWindow = () => {
    const newWindow = <ChatWindow key={windows.length} onClose={() => closeWindow("chat")} />;
    setWindows([...windows, newWindow]);
    setOpenWindows({ ...openWindows, chat: true });
    console.log("openWindows after adding chat window:", openWindows);
  };

  const addInternetWindow = () => {
    const newWindow = <InternetWindow key={windows.length} onClose={() => closeWindow("internet")} />;
    setWindows([...windows, newWindow]);
    setOpenWindows({ ...openWindows, internet: true });
    console.log("openWindows after adding internet window:", openWindows);
  };

  const handleRecycleBin = () => {
    alert("Recycle Bin clicked");
  };

  const closeWindow = (type) => {
    const updatedOpenWindows = { ...openWindows };
    const updatedWindows = windows.filter((window) => {
      if (type === "about" && window.type === "about") {
        updatedOpenWindows.about = false;
        return false;
      } else if (type === "pet" && window.type === "pet") {
        updatedOpenWindows.pet = false;
        return false;
      } else if (type === "sound" && window.type === "sound") {
        updatedOpenWindows.sound = false;
        return false;
      } else if (type === "chat" && window.type === "chat") {
        updatedOpenWindows.chat = false;
        return false;
      } else if (type === "internet" && window.type === "internet") {
        updatedOpenWindows.internet = false;
        return false;
      }
      return true;
    });
    setWindows(updatedWindows);
    setOpenWindows(updatedOpenWindows);
  };  

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        iconRef1.current &&
        !iconRef1.current.contains(event.target) &&
        iconRef2.current &&
        !iconRef2.current.contains(event.target) &&
        iconRef3.current &&
        !iconRef3.current.contains(event.target) &&
        iconRef4.current &&
        !iconRef4.current.contains(event.target) &&
        iconRef5.current &&
        !iconRef5.current.contains(event.target) &&
        iconRef6.current &&
        !iconRef6.current.contains(event.target)
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
    <div className="App" onMouseDownCapture={playClick}>
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
          id="virtualpet"
          isSelected={selectedIcon === "virtualpet"}
          onClick={() => handleClick("virtualpet")}
          ref={iconRef2}
        >
          <div className="picture">
            <img src="icons/virtualpet.png" alt="Virtual Pet" />
          </div>
          <div className="name">
            <span>Virtual Pet</span>
          </div>
        </Icon>
        <Icon
          id="soundpanel"
          isSelected={selectedIcon === "soundpanel"}
          onClick={() => handleClick("soundpanel")}
          ref={iconRef3}
        >
          <div className="picture">
            <img src="icons/soundpanel.png" alt="Sound Panel" />
          </div>
          <div className="name">
            <span>Sound Panel</span>
          </div>
        </Icon>
        <Icon
          id="chat"
          isSelected={selectedIcon === "chat"}
          onClick={() => handleClick("chat")}
          ref={iconRef4}
        >
          <div className="picture">
            <img src="icons/chat.png" alt="Chat" />
          </div>
          <div className="name">
            <span>Chat</span>
          </div>
        </Icon>
        <Icon
          id="internet"
          isSelected={selectedIcon === "internet"}
          onClick={() => handleClick("internet")}
          ref={iconRef5}
        >
          <div className="picture">
            <img src="icons/internet.png" alt="Internet Explorer" />
          </div>
          <div className="name">
            <span>Internet</span>
          </div>
        </Icon>
        <Icon
          id="recyclebin"
          isSelected={selectedIcon === "recyclebin"}
          onClick={() => handleClick("recyclebin")}
          ref={iconRef6}
        >
          <div className="picture">
            <img src="icons/recyclebin.png" alt="Recycle Bin" />
          </div>
          <div className="name">
            <span>Recycle Bin</span>
          </div>
        </Icon>
      </div>
      <div className="windowcontainer">
      {windows.map((window, index) => {
        console.log("Window component:", window.type.name);
        return <div key={index}>{window}</div>;
      })}
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

const AboutWindow = ({ onClose }) => {
  return (
    <Rnd
      default={{
        x: 200,
        y: 200
      }}
      enableResizing={false}
      dragHandleClassName="title-bar"
    >
      <div className="window active">
        <div className="title-bar">
          <div className="title-bar-text">About</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div className="window-body has-space">
          <div className="placeholder">
            <p>Drag Me!</p>
            <p>Work in Progress...</p>
          </div>
        </div>
      </div>
    </Rnd>
  );
};

const PetWindow = ({ onClose }) => {
  const [selectedPet, setSelectedPet] = useState("bonzi");

  const togglePet = () => {
    setSelectedPet(prevPet => {
      if (prevPet === "bonzi") return "peedy";
      else if (prevPet === "peedy") return "clippy";
      else if (prevPet === "clippy") return "rover";
      else return "bonzi";
    });
  };

  return (
    <Rnd
      default={{
        x: 200,
        y: 200
      }}
      enableResizing={false}
      dragHandleClassName="title-bar"
    >
      <div className="window active">
        <div className="title-bar">
          <div className="title-bar-text">Virtual Pet</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div className="window-body has-space petwindow">
          <button onClick={togglePet}>Switch</button>
          <img
            className="petimg"
            src={`images/${selectedPet}.png`}
            alt="Virtual Pet"
          ></img>
        </div>
      </div>
    </Rnd>
  );
};

const SoundWindow = ({ onClose, clickVolume, setClickVolume }) => {
  const [sliderValue, setSliderValue] = useState(clickVolume);

  const handleSaveClick = () => {
    setClickVolume(sliderValue);
  };

  return (
    <Rnd
      default={{
        x: 200,
        y: 200
      }}
      enableResizing={false}
      dragHandleClassName="title-bar"
    >
      <div className="window active">
        <div className="title-bar">
          <div className="title-bar-text">Sound Panel</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div className="window-body has-space">
            <label>Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step={0.1}
              value={sliderValue}
              onChange={(event) => setSliderValue(event.target.value)}
            />
            {sliderValue === 0 ? (
              <p>Muted</p>
            ) : (
              <p>Value: {sliderValue * 10}</p>
            )}
            <button onClick={handleSaveClick}>Save</button>
        </div>
      </div>
    </Rnd>
  );
};

const ChatWindow = ({ onClose }) => {
  return (
    <Rnd
      default={{
        x: 200,
        y: 200
      }}
      enableResizing={false}
      dragHandleClassName="title-bar"
    >
      <div className="window active">
        <div className="title-bar">
          <div className="title-bar-text">Chat</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div className="window-body has-space">
          <div className="placeholder">
            <p>Chat Window</p>
            <p>Work in Progress...</p>
          </div>
        </div>
      </div>
    </Rnd>
  );
};

const InternetWindow = ({ onClose }) => {
  return (
    <Rnd
      default={{
        x: 200,
        y: 200
      }}
      enableResizing={false}
      dragHandleClassName="title-bar"
    >
      <div className="window active">
        <div className="title-bar">
          <div className="title-bar-text">Internet Explorer</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div className="window-body has-space">
          <div className="placeholder">
            <p>Internet Explorer</p>
            <p>Work in Progress...</p>
          </div>
        </div>
      </div>
    </Rnd>
  );
};

export default App;
