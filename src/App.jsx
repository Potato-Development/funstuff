import React, { useState, useEffect, useRef } from "react";
import "./style.css"
import "7.css/dist/7.css";
import { Rnd } from "react-rnd";
import useSound from "use-sound";
import clicksound from "./assets/sounds/click.mp3";
import Clock from "react-live-clock";

function App() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [windows, setWindows] = useState([]);
  const iconRef1 = useRef(null);
  const iconRef2 = useRef(null);
  const iconRef3 = useRef(null);
  const iconRef4 = useRef(null);
  const iconRef5 = useRef(null);
  const iconRef6 = useRef(null);
  const iconRef7 = useRef(null);
  const iconRef8 = useRef(null);
  const iconRef9 = useRef(null);
  const iconRef10 = useRef(null);
  const iconRef11 = useRef(null);
  const [clickVolume, setClickVolume] = useState(0);
  const [playClick] = useSound(clicksound, { volume: clickVolume });
  const [openWindows, setOpenWindows] = useState({});
  const [audioPanelOpen, setAudioPanelOpen] = useState(false);
  const [actionRead, setActionRead] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [showTaskbar, setShowTaskbar] = useState(true);

  const handleVolumeChange = (volume) => {
    setClickVolume(volume);
  };

  const getVolumeIcon = () => {
    if (clickVolume >= 0 && clickVolume < 0.1) return "tray/audio1.png";
    else if (clickVolume <= 0.3) return "tray/audio4.png";
    else if (clickVolume <= 0.6) return "tray/audio3.png";
    else return "tray/audio2.png";
  };

  const getActionIcon = () => {
    if (!actionRead) return "tray/action2.png";
    else return "tray/action1.png";
  };

  const handleClick = (id) => {
    if (selectedIcon === id) {
      if (id === "about") {
        if (!openWindows["about"]) {
          addAboutWindow();
        }
      } else if (id === "recyclebin") {
        handleRecycleBin();
      } else if (id === "pet") {
        if (!openWindows["pet"]) {
          addPetWindow();
        }
      } else if (id === "chat") {
        if (!openWindows["chat"]) {
          addChatWindow();
        }
      } else if (id === "internet") {
        if (!openWindows["internet"]) {
          addInternetWindow();
        }
      } else if (id === "computer") {
        if (!openWindows["computer"]) {
          addComputerWindow();
        }
      } else if (id === "notepad") {
        if (!openWindows["notepad"]) {
          addNotepadWindow();
        }
      } else if (id === "commandprompt") {
        if (!openWindows["commandprompt"]) {
          addCommandPromptWindow();
        }
      } else if (id === "horror") {
        handleHorrorStart();
      } else if (id === "update") {
        handleUpdateStart();
      } else if (id === "taskbar") {
        handleToggleTaskbar();
      }
      setSelectedIcon(null)
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

  const addComputerWindow = () => {
    const newWindow = <ComputerWindow key={windows.length} onClose={() => closeWindow("computer")} />;
    setWindows([...windows, newWindow]);
    setOpenWindows({ ...openWindows, computer: true });
    console.log("openWindows after adding computer window:", openWindows);
  };

  const addNotepadWindow = () => {
    const newWindow = <NotepadWindow key={windows.length} onClose={() => closeWindow("notepad")} />;
    setWindows([...windows, newWindow]);
    setOpenWindows({ ...openWindows, notepad: true });
    console.log("openWindows after adding notepad window:", openWindows);
  };

  const addCommandPromptWindow = () => {
    const newWindow = <CommandPromptWindow key={windows.length} onClose={() => closeWindow("commandprompt")} />;
    setWindows([...windows, newWindow]);
    setOpenWindows({ ...openWindows, commandprompt: true });
    console.log("openWindows after adding command prompt window:", openWindows);
  };

  const handleRecycleBin = () => {
    alert("Recycle Bin clicked");
  };

  const handleHorrorStart = () => {
    alert("Something spooky is brewing...");
  };

  const handleUpdateStart = () => {
    alert("Development takes time...");
  };

  const handleAudioPanel = () => {
    setAudioPanelOpen(!audioPanelOpen);
  };

  const handleAction = () => {
    setActionOpen(!actionOpen);
    setActionRead(true);
  };

  const handleToggleTaskbar = () => {
    if (showTaskbar) {
      setShowTaskbar(false)
      Array.from(document.getElementsByClassName("taskbar")).forEach((element) => {element.style.visibility = "hidden"});
    } else {
      setShowTaskbar(true)
      Array.from(document.getElementsByClassName("taskbar")).forEach((element) => {element.style.visibility = "visible"});
    }
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
      } else if (type === "chat" && window.type === "chat") {
        updatedOpenWindows.chat = false;
        return false;
      } else if (type === "internet" && window.type === "internet") {
        updatedOpenWindows.internet = false;
        return false;
      } else if (type === "computer" && window.type === "computer") {
        updatedOpenWindows.computer = false;
        return false;
      } else if (type === "notepad" && window.type === "notepad") {
        updatedOpenWindows.notepad = false;
        return false;
      } else if (type === "commandprompt" && window.type === "commandprompt") {
        updatedOpenWindows.commandprompt = false;
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
        !iconRef6.current.contains(event.target) &&
        iconRef7.current &&
        !iconRef7.current.contains(event.target) &&
        iconRef8.current &&
        !iconRef8.current.contains(event.target) &&
        iconRef9.current &&
        !iconRef9.current.contains(event.target) &&
        iconRef10.current &&
        !iconRef10.current.contains(event.target)&&
        iconRef11.current &&
        !iconRef11.current.contains(event.target)
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
          id="about"
          isSelected={selectedIcon === "about"}
          onClick={() => handleClick("about")}
          ref={iconRef1}
        >
          <div className="picture">
            <img src="icons/about.png" alt="About" />
          </div>
          <div className="name">
            <span>About</span>
          </div>
        </Icon>
        <Icon
          id="pet"
          isSelected={selectedIcon === "pet"}
          onClick={() => handleClick("pet")}
          ref={iconRef2}
        >
          <div className="picture">
            <img src="icons/pet.png" alt="Virtual Pet" />
          </div>
          <div className="name">
            <span>Virtual Pet</span>
          </div>
        </Icon>
        <Icon
          id="chat"
          isSelected={selectedIcon === "chat"}
          onClick={() => handleClick("chat")}
          ref={iconRef3}
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
          ref={iconRef4}
        >
          <div className="picture">
            <img src="icons/internet.png" alt="Internet Explorer" />
          </div>
          <div className="name">
            <span>Internet</span>
          </div>
        </Icon>
        <Icon
          id="computer"
          isSelected={selectedIcon === "computer"}
          onClick={() => handleClick("computer")}
          ref={iconRef5}
        >
          <div className="picture">
            <img src="icons/computer.png" alt="Computer" />
          </div>
          <div className="name">
            <span>Computer</span>
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
        <Icon
          id="horror"
          isSelected={selectedIcon === "horror"}
          onClick={() => handleClick("horror")}
          ref={iconRef7}
        >
          <div className="picture">
            <img src="icons/horror.png" alt="Horror" />
          </div>
          <div className="name">
            <span>Horror</span>
          </div>
        </Icon>
        <Icon
          id="update"
          isSelected={selectedIcon === "update"}
          onClick={() => handleClick("update")}
          ref={iconRef8}
        >
          <div className="picture">
            <img src="icons/update.png" alt="Update" />
          </div>
          <div className="name">
            <span>Update</span>
          </div>
        </Icon>
        <Icon
          id="notepad"
          isSelected={selectedIcon === "notepad"}
          onClick={() => handleClick("notepad")}
          ref={iconRef9}
        >
          <div className="picture">
            <img src="icons/notepad.png" alt="Notepad" />
          </div>
          <div className="name">
            <span>Notepad</span>
          </div>
        </Icon>
        <Icon
          id="taskbar"
          isSelected={selectedIcon === "taskbar"}
          onClick={() => handleClick("taskbar")}
          ref={iconRef10}
        >
          <div className="picture">
            <img src="icons/taskbar.png" alt="Taskbar" />
          </div>
          <div className="name">
            <span>Taskbar</span>
          </div>
        </Icon>
        <Icon
          id="commandprompt"
          isSelected={selectedIcon === "commandprompt"}
          onClick={() => handleClick("commandprompt")}
          ref={iconRef11}
        >
          <div className="picture">
            <img src="icons/cmd.png" alt="Taskbar" />
          </div>
          <div className="name">
            <span>Command Prompt</span>
          </div>
        </Icon>
      </div>
      <div className="windowcontainer">
      {windows.map((window, index) => {
        console.log("Window component:", window.type.name);
        return <div key={index}>{window}</div>;
      })}
      </div>
      <div className="taskbarcontainer">
        <div className="taskbar bg"></div>
        <div className="taskbar fg">
          <div className="left">
            <div className="start start-button">
              <img className="start start-normal" src="icons/start.png" alt="Start"/>
            </div>
          </div>
          <div className="right">
            <div className="tray">
              <img className="trayicon action" src={getActionIcon()} alt="Action" onClick={handleAction}></img>
              <img className="trayicon network" src="tray/network.png" alt="Network"></img>
              <img className="trayicon audio" src={getVolumeIcon()} alt="Audio" onClick={handleAudioPanel}></img>
              <div className="timecontainer">
                <Clock format={"HH:mm A"} ticking={true}/>
                <Clock format={"DD/MM/YYYY"} ticking={true}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      {audioPanelOpen && (
        <AudioPanel clickVolume={clickVolume} setClickVolume={handleVolumeChange} />
      )}
      {actionOpen && (
        <Action/>
      )}
    </div>
  )
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

const ComputerWindow = ({ onClose }) => {
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
          <div className="title-bar-text">Computer</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div className="window-body has-space">
          <div className="placeholder">
            <p>This PC</p>
            <p>Work in Progress...</p>
          </div>
        </div>
      </div>
    </Rnd>
  );
};

const NotepadWindow = ({ onClose }) => {
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
          <div className="title-bar-text">Notepad</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div className="window-body has-space">
          <div className="placeholder">
            <p>Notepad Window</p>
            <p>Work in Progress...</p>
          </div>
        </div>
      </div>
    </Rnd>
  );
};

const CommandPromptWindow = ({ onClose }) => {
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
          <div className="title-bar-text">Command Prompt</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div className="window-body has-space commandprompt">
          <div className="placeholder commandprompt">
            <p>Command Prompt Window</p>
            <p>Work in Progress...</p>
          </div>
        </div>
      </div>
    </Rnd>
  );
};

const AudioPanel = ({ clickVolume, setClickVolume }) => {
  const [sliderValue, setSliderValue] = useState(clickVolume);

  const handleSaveClick = () => {
    setClickVolume(sliderValue);
  };

  return (
    <div className="panelcontainer">
      <div className="window active">
        <div className="title-bar">
          <div className="title-bar-text">Audio Panel</div>
        </div>
        <div className="window-body has-space" style={{width: 250}}>
          <label>Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step={0.1}
            value={sliderValue}
            onChange={(event) => setSliderValue(event.target.value)}
            style={{width: "95%"}}
          />
          {sliderValue === 0 ? (
            <p>Muted</p>
          ) : (
            <p>Value: {sliderValue * 10}</p>
          )}
          <button onClick={handleSaveClick}>Save</button>
        </div>
      </div>
    </div>
  );
};

const Action = () => {
  return(
    <div role="tooltip" className="is-top is-left actionballoon">This is an example of a desktop notification.</div>
  )
}

export default App
