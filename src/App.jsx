import React, { useState, useEffect, useRef } from "react";
import "./style.css"
import "7.css/dist/7.css";
import { Rnd } from "react-rnd";
import useSound from "use-sound";
import clicksound from "./assets/sounds/click.mp3";
import errorsound from "./assets/sounds/error.wav";
import defaultsound from "./assets/sounds/default.wav";
import startupsound from "./assets/sounds/startup.mp3";
import shutdownsound from "./assets/sounds/shutdown.mp3";
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
  const iconRef12 = useRef(null);
  const iconRef13 = useRef(null);
  const [clickVolume, setClickVolume] = useState(0.5);
  const [playClick] = useSound(clicksound, { volume: clickVolume });
  const [playError] = useSound(errorsound, { volume: clickVolume });
  const [playDefault] = useSound(defaultsound, { volume: clickVolume });
  const [playStartup] = useSound(startupsound, { volume: clickVolume });
  const [playShutdown] = useSound(shutdownsound, { volume: clickVolume });
  const [openWindows, setOpenWindows] = useState({});
  const [audioPanelOpen, setAudioPanelOpen] = useState(false);
  const [actionRead, setActionRead] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);
  const [showTaskbar, setShowTaskbar] = useState(true);
  const [playSounds, setPlaySounds] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const timerRef = useRef(null);
  const [showStart, setShowStart] = useState(false);

  const getVolumeIcon = () => {
    if (!playSounds) return "tray/audio0.png";
    if (clickVolume >= 0 && clickVolume < 0.1) return "tray/audio1.png";
    else if (clickVolume <= 0.3) return "tray/audio4.png";
    else if (clickVolume <= 0.6) return "tray/audio3.png";
    else return "tray/audio2.png";
  };

  const getActionIcon = () => {
    if (!actionRead) return "tray/action2.png";
    else return "tray/action1.png";
  };

  const handleClick = (id, start) => {
    if (selectedIcon === id || start) {
      if (id === "about") {
        if (!openWindows["about"]) {
          addAboutWindow();
        } else {
          if (playSounds) {
            playError()
          }
        }
      } else if (id === "recyclebin") {
        handleRecycleBin();
      } else if (id === "pet") {
        if (!openWindows["pet"]) {
          addPetWindow();
        } else {
          if (playSounds) {
            playError()
          }
        }
      } else if (id === "chat") {
        if (!openWindows["chat"]) {
          addChatWindow();
        } else {
          if (playSounds) {
            playError()
          }
        }
      } else if (id === "internet") {
        if (!openWindows["internet"]) {
          addInternetWindow();
        } else {
          if (playSounds) {
            playError()
          }
        }
      } else if (id === "computer") {
        if (!openWindows["computer"]) {
          addComputerWindow();
        } else {
          if (playSounds) {
            playError()
          }
        }
      } else if (id === "notepad") {
        if (!openWindows["notepad"]) {
          addNotepadWindow();
        } else {
          if (playSounds) {
            playError()
          }
        }
      } else if (id === "commandprompt") {
        if (!openWindows["commandprompt"]) {
          addCommandPromptWindow();
        } else {
          if (playSounds) {
            playError()
          }
        }
      } else if (id === "wallpaper") {
        if (!openWindows["wallpaper"]) {
          addWallpaperWindow();
        } else {
          if (playSounds) {
            playError()
          }
        }
      } else if (id === "horror") {
        handleHorrorStart();
      } else if (id === "update") {
        handleUpdateStart();
      } else if (id === "taskbar") {
        handleToggleTaskbar();
      } else if (id === "fullscreen") {
        handleFullScreen();
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
  };

  const addPetWindow = () => {
    const newWindow = <PetWindow key={windows.length} onClose={() => closeWindow("pet")} />;
    setWindows([...windows, newWindow]);
    setOpenWindows({ ...openWindows, pet: true });
  };

  const addChatWindow = () => {
    const newWindow = <ChatWindow key={windows.length} onClose={() => closeWindow("chat")} />;
    setWindows([...windows, newWindow]);
    setOpenWindows({ ...openWindows, chat: true });
  };

  const addInternetWindow = () => {
    const newWindow = <InternetWindow key={windows.length} onClose={() => closeWindow("internet")} />;
    setWindows([...windows, newWindow]);
    setOpenWindows({ ...openWindows, internet: true });
  };

  const addComputerWindow = () => {
    const newWindow = <ComputerWindow key={windows.length} onClose={() => closeWindow("computer")} />;
    setWindows([...windows, newWindow]);
    setOpenWindows({ ...openWindows, computer: true });
  };

  const addNotepadWindow = () => {
    const newWindow = <NotepadWindow key={windows.length} onClose={() => closeWindow("notepad")} />;
    setWindows([...windows, newWindow]);
    setOpenWindows({ ...openWindows, notepad: true });
  };

  const addCommandPromptWindow = () => {
    const newWindow = <CommandPromptWindow key={windows.length} onClose={() => closeWindow("commandprompt")} />;
    setWindows([...windows, newWindow]);
    setOpenWindows({ ...openWindows, commandprompt: true });
  };

  const addWallpaperWindow = () => {
    const newWindow = <WallpaperWindow key={windows.length} onClose={() => closeWindow("wallpaper")} />;
    setWindows([...windows, newWindow]);
    setOpenWindows({ ...openWindows, wallpaper: true });
  };

  const handleRecycleBin = () => {
    alert("Recycle Bin clicked");
  };

  const handleHorrorStart = () => {
    alert("Something spooky is brewing...");
  };

  const handleUpdateStart = () => {
    setShowUpdate(true);
    playShutdown();
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

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.body.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  };

  const handleSearch = (query) => {
    Array.from(document.getElementsByClassName("leftbutton")).forEach((element) => {
      if (!element.innerText.toLowerCase().includes(query.toLowerCase())) {
        element.style.display = "none";
      } else {
        element.style.display = "flex";
      }
    })
  }

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
      } else if (type === "wallpaper" && window.type === "wallpaper") {
        updatedOpenWindows.wallpaper = false;
        return false;
      }
      return true;
    });
    setWindows(updatedWindows);
    setOpenWindows(updatedOpenWindows);
  };

  useEffect(() => {
        if (showUpdate) {
          document.getElementById("updatescreen").requestFullscreen()
        } else {
          if (document.fullscreenElement) {
            document.exitFullscreen()
          }
        }
  }, [showUpdate]);

useEffect(() => {
    const handleChange = () => {
      if (!document.fullscreenElement && showUpdate) {
        setShowUpdate(false);
        playStartup();
      }
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
    };
  }, [showUpdate]);

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
        !iconRef10.current.contains(event.target) &&
        iconRef11.current &&
        !iconRef11.current.contains(event.target) &&
        iconRef12.current &&
        !iconRef12.current.contains(event.target) &&
        iconRef13.current &&
        !iconRef13.current.contains(event.target)
      ) {
        setSelectedIcon(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (showUpdate) {
      timerRef.current = setTimeout(() => {
        setUpdateProgress(updateProgress + 1);
        if (updateProgress > 99) {
          setShowUpdate(false)
          playStartup()
        }
      }, 1000);
    }
    () => {
      clearTimeout(timerRef.current);
    }
  }, [updateProgress, showUpdate])

  return (
    <div className="App" onMouseDownCapture={() => {if (playSounds) playClick()}}>
      {showUpdate &&
        <div id="updatescreen">
            <div className="updatecontainer">
              <span className="loader animate updatespinner" aria-label="Loading"></span>
              <span className="updatetext">Configuring Windows updates<br/>{updateProgress}% complete<br/>Do not turn off your computer.</span>
            </div>
            <img className="updatelogo" src="images/sevenlogo.png"></img>
        </div>
      }
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
            <img src="icons/cmd.png" alt="Command Prompt" />
          </div>
          <div className="name">
            <span>Terminal</span>
          </div>
        </Icon>
        <Icon
          id="fullscreen"
          isSelected={selectedIcon === "fullscreen"}
          onClick={() => handleClick("fullscreen")}
          ref={iconRef12}
        >
          <div className="picture">
            <img src="icons/fullscreen.png" alt="Full Screen" />
          </div>
          <div className="name">
            <span>Full Screen</span>
          </div>
        </Icon>
        <Icon
          id="wallpaper"
          isSelected={selectedIcon === "wallpaper"}
          onClick={() => handleClick("wallpaper")}
          ref={iconRef13}
        >
          <div className="picture">
            <img src="icons/wallpaper.png" alt="Wallpaper" />
          </div>
          <div className="name">
            <span>Wallpaper</span>
          </div>
        </Icon>
      </div>
      <div className="windowcontainer">
      {windows.map((window, index) => {return <div key={index}>{window}</div>})}
      </div>
      <div className="taskbarcontainer">
        <div className="taskbar bg"></div>
        <div className="taskbar fg">
          <div className="left">
            <div className="start start-button">
              <img className="start start-normal" src="icons/start.png" alt="Start" onClick={() => {setShowStart(!showStart)}}/>
            </div>
            {showStart &&
              <div className="startcontainer">
                <div className="window" id="startmenu">
                  <div className="window-body" id="startbody">
                    <div className="startleft">
                      <ul role="menu" id="startlist">
                        <li role="menuitem" className="leftbutton" id="startbutton" tabIndex="0" aria-haspopup="true">Getting Started</li>
                        <li role="menuitem" className="leftbutton"><a id="startbutton" onClick={() => {handleClick("notepad", true)}}>Notepad</a></li>
                        <li role="menuitem" className="leftbutton"><a id="startbutton" onClick={() => {handleClick("internet", true)}}>Internet</a></li>
                        <li role="menuitem" className="leftbutton"><a id="startbutton" onClick={() => {handleClick("chat", true)}}>Chat</a></li>
                        <li role="menuitem" className="leftbutton"><a id="startbutton" onClick={() => {handleClick("pet", true)}}>Virtual Pet</a></li>
                        <li role="menuitem" className="leftbutton"><a id="startbutton" onClick={() => {handleClick("commandprompt", true)}}>Command Prompt</a></li>
                      </ul>
                      <div className="startsearchcontainer">
                        <input className="startsearch" type="search" placeholder="Search programs and files" onChange={() => {handleSearch(event.target.value)}}/>
                      </div>
                    </div>
                  </div>
                  <div className="startright">
                      <div className="window glass" id="profilecontainer">
                        <div className="window-body" id="profilebody">
                          <img id="profilepicture" src="images/profilepicture.png"/>
                        </div>
                      </div>
                      <ul role="menu" id="startlist">
                        <li role="menuitem" className="rightbutton"><a id="startbutton">Admin</a></li>
                        <li role="menuitem" className="rightbutton"><a id="startbutton">Documents</a></li>
                        <li role="menuitem" className="rightbutton"><a id="startbutton">Pictures</a></li>
                        <li role="menuitem" className="rightbutton has-divider"><a id="startbutton">Music</a></li>
                        <li role="menuitem" className="rightbutton has-divider"><a id="startbutton" onClick={() => {handleClick("computer", true)}}>Computer</a></li>
                        <li role="menuitem" className="rightbutton"><a id="startbutton">Control Panel</a></li>
                        <li role="menuitem" className="rightbutton"><a id="startbutton">Devices and Printers</a></li>
                        <li role="menuitem" className="rightbutton"><a id="startbutton">Default Programs</a></li>
                        <li role="menuitem" className="rightbutton" ><a id="startbutton">Help and Support</a></li>
                      </ul>
                    </div>
                </div>
              </div>
            }
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
        <AudioPanel clickVolume={clickVolume} setClickVolume={setClickVolume} playSounds={playSounds} setPlaySounds={setPlaySounds} playDefault={playDefault} />
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
  const [currentWebsite, setCurrentWebsite] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (searchInput.trim() === "") {
        setCurrentWebsite("https://example.com")
        setSearchInput("https://example.com")
      } else if (!searchInput.startsWith("http://") && !searchInput.startsWith("https://")) {
        setCurrentWebsite("http://" + searchInput)
        setSearchInput("http://" + searchInput)
      } else {
        setCurrentWebsite(searchInput)
        setSearchInput(searchInput)
      }
    }
  };

  return (
    <Rnd
      default={{
        x: 200,
        y: 200,
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
            <div className="internetcontainer">
              <div className="internetheader">
                <input className="internetsearch" type="text" value={searchInput} onChange={handleSearchInput} onKeyDown={handleKeyPress} placeholder="https://example.com"></input>
              </div>
              <iframe className="internetcontent" src={currentWebsite}></iframe>
              <div className="internetfooter"></div>
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
  const [wordWrap, setWordWrap] = useState(false)
  const [size, setSize] = useState("Medium")
  const [font, setFont] = useState("Segoe UI")

  const handleWordWrap = () => {
    setWordWrap(!wordWrap)
    if (wordWrap) {
      document.getElementById("notepadinput").style.textWrap = "wrap"
    } else if (!wordWrap) {
      document.getElementById("notepadinput").style.textWrap = "nowrap"
    }
  }

  const handleSize = (value) => {
    setSize(value)
    if (value === "Small") {
      document.getElementById("notepadinput").style.fontSize = "6pt"
    } else if (value === "Medium") {
      document.getElementById("notepadinput").style.fontSize = "9pt"
    } else if (value === "Large") {
      document.getElementById("notepadinput").style.fontSize = "12pt"
    }
  }

  const handleFont = (value) => {
    setFont(value)
    if (value === "Arial") {
      document.getElementById("notepadinput").style.fontFamily = "Arial, sans-serif"
    } else if (value === "Consolas") {
      document.getElementById("notepadinput").style.fontFamily = "Consolas, monaco, monospace"
    } else if (value === "Segoe UI") {
      document.getElementById("notepadinput").style.fontFamily = "Segoe UI, SegoeUI, Noto Sans, sans-serif"
    }
  }

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
        <div className="window-body">
          <ul role="menubar">
            <li role="menuitem" tabIndex="0">File</li>
            <li role="menuitem" tabIndex="0">Edit</li>
            <li role="menuitem" tabIndex="0" aria-haspopup="true">
              Format
              <ul role="menu">
                <li role="menuitem"><a onClick={() => handleWordWrap()}>Word Wrap {wordWrap && <span>{"\u2714"}</span>}</a></li>
                <li role="menuitem" tabIndex="0" aria-haspopup="true">
                  Font...
                  <ul role="menu">
                    <li role="menuitem" tabIndex="0" aria-haspopup="true">
                      Font
                      <ul role="menu">
                        <li role="menuitem"><a onClick={() => {handleFont("Arial")}}>Arial {font === "Arial" && <span>{"\u2714"}</span>}</a></li>
                        <li role="menuitem"><a onClick={() => {handleFont("Consolas")}}>Consolas {font === "Consolas" && <span>{"\u2714"}</span>}</a></li>
                        <li role="menuitem"><a onClick={() => {handleFont("Segoe UI")}}>Segoe UI {font === "Segoe UI" && <span>{"\u2714"}</span>}</a></li>
                      </ul>
                    </li>
                    <li role="menuitem" tabIndex="0" aria-haspopup="true">
                      Size
                      <ul role="menu">
                        <li role="menuitem"><a onClick={() => {handleSize("Small")}}>Small {size === "Small" && <span>{"\u2714"}</span>}</a></li>
                        <li role="menuitem"><a onClick={() => {handleSize("Medium")}}>Medium {size === "Medium" && <span>{"\u2714"}</span>}</a></li>
                        <li role="menuitem"><a onClick={() => {handleSize("Large")}}>Large {size === "Large" && <span>{"\u2714"}</span>}</a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li role="menuitem" tabIndex="0">View</li>
            <li role="menuitem" tabIndex="0">Help</li>
          </ul>
          <textarea id="notepadinput" className="has-scrollbar"></textarea>
        </div>
      </div>
    </Rnd>
  );
};

const CommandPromptWindow = ({ onClose }) => {
  const [commandInput, setCommandInput] = useState("");
  const [commandOutput, setCommandOutput] = useState("");
  
  const handleCommandInput = (event) => {
    setCommandInput(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      const formattedInput = commandInput.toUpperCase()
      if (formattedInput.trim() === "HELP") {
        setCommandOutput(`For more information on a specific command, type HELP command-name\nHELP           Provides Help information for Windows commands.\nVER            Displays the Windows version.`)
      } else if (formattedInput.startsWith("HELP ")) {
        if (formattedInput.slice(5) === "HELP") {
          setCommandOutput(`Provides help information for Windows commands.\n\nHELP [command]\n\n    command - displays help information on that command.`)
        } else if (formattedInput.slice(5) === "VER") {
            setCommandOutput(`Displays the Windows version.\n\nVER`)
          }
      } else if (formattedInput === "VER") {
        setCommandOutput(`Microsoft Windows [Version 6.1.7601]`)
      } else {
        setCommandOutput(`"${commandInput}" is not recognized as an internal or external command, operable program or batch file.`)
      }
      setCommandInput("")
    }
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
          <div className="title-bar-text">Command Prompt</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div className="window-body has-space commandprompt">
          <div className="placeholder">
            <div className="inputcontainer"><div>C:\Windows\System32&gt;&nbsp;</div><input type="text" id="commandinput" value={commandInput} onChange={handleCommandInput} onKeyDown={handleKeyPress}></input></div>
            <textarea id="commandoutput" rows={4} disabled value={commandOutput}></textarea>
          </div>
        </div>
      </div>
    </Rnd>
  );
};

const WallpaperWindow = ({ onClose }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const wallpaperRef1 = useRef(null);
  const wallpaperRef2 = useRef(null);
  const [currentWallpaper, setCurrentWallpaper] = useState("seven")

  const handleClick = (id) => {
    if (selectedIcon === id) {
      if (id === "seven") {
        setCurrentWallpaper(id)
        Array.from(document.getElementsByClassName("App")).forEach((element) => {element.style.backgroundImage = "url(../images/wallpaper.jpg)"});
      } else if (id === "xp") {
        setCurrentWallpaper(id)
        Array.from(document.getElementsByClassName("App")).forEach((element) => {element.style.backgroundImage = "url(../images/wallpaper2.jpg)"});
      }
      setSelectedIcon(null)
    } else {
      setSelectedIcon(id);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        wallpaperRef1.current &&
        !wallpaperRef1.current.contains(event.target) &&
        wallpaperRef2.current &&
        !wallpaperRef2.current.contains(event.target)
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
          <div className="title-bar-text">Wallpaper</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div className="window-body has-space">
          <div className="wallpapercontainer">
            <Icon
              id="seven"
              isSelected={selectedIcon === "seven" || currentWallpaper === "seven"}
              onClick={() => handleClick("seven")}
              ref={wallpaperRef1}
            >
              <div className="picture wallpaper">
                <img src="images/wallpaper.jpg" alt="Windows 7" />
              </div>
            </Icon>
            <Icon
              id="xp"
              isSelected={selectedIcon === "xp" || currentWallpaper === "xp"}
              onClick={() => handleClick("xp")}
              ref={wallpaperRef2}
            >
              <div className="picture wallpaper">
                <img src="images/wallpaper2.jpg" alt="Windows XP" />
              </div>
            </Icon>
          </div>
        </div>
      </div>
    </Rnd>
  );
};

const AudioPanel = ({ clickVolume, setClickVolume, playSounds, setPlaySounds, playDefault }) => {
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
            value={clickVolume}
            onChange={(event) => setClickVolume(event.target.value)}
            onMouseUp={() => {if (playSounds) playDefault()}}
            style={{width: "95%"}}
          />
          {clickVolume === 0 ? (
            <p>Muted</p>
          ) : (
            <p>Value: {clickVolume * 10}</p>
          )}
          <input type="checkbox" id="errors" checked={playSounds} onChange={(event) => setPlaySounds(event.target.checked)}></input>
          <label htmlFor="errors">Sounds</label>
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
