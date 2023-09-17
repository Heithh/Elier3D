import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import axios from 'axios';
import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab, AddToCart } from '../components';


function Customizer() {


  const [file, setFile] = useState('');
  const snap = useSnapshot(state);

  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [showAddToCart, setShowAddToCart] = useState(false);


  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  useEffect(() => {
    let timer;
    if (activeEditorTab === "add") {
      setShowAddToCart(true);
      timer = setTimeout(() => {
        setShowAddToCart(false);
        setActiveEditorTab("");
      }, 2000);
    }

    return () => {
      clearTimeout(timer); // Clean up the timer
    };
  }, [activeEditorTab]);

  // show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />
      case "filepicker":
        return <FilePicker
        file={file}
        setFile={setFile}
        readFile={readFile}
        />
      case "aipicker":
        return <AIPicker
        prompt={prompt}
        setPrompt={setPrompt}
        generatingImg={generatingImg}
        handleSubmit={handleSubmit}
        />
        case "add":
          return showAddToCart ? <AddToCart /> : null;
      default:
        return null;
    }
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if(!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab)
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
          state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
          state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  };

  const readFile = (type) => {
    reader(file)
      .then((result) => {
        handleDecals(type, result);
        setActiveEditorTab("");
      })
  };

  const handleTabClick = (tabName) => {
    if (activeEditorTab === tabName) {
      setActiveEditorTab("");
    } else {
      setActiveEditorTab(tabName);
    }
  };

  const handleSubmit = async (type) => {
    if(!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch('http://localhost:8080/api/elier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await response.json();


      handleDecals(type, `data:image/png;base64,${data.photo}`)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const handleCheckout = () => {

    axios.post("http://localhost:8080/create-checkout-session", {
    items: [
      { id: 1, quantity: 3 },
      { id: 2, quantity: 1 },
    ]
  })
  .then(response => {
    if (response.status === 200) {
      window.location = response.data.url;
    } else {
      console.error(response.data);
    }
  })
  .catch(error => {
    console.error(error);
  });

  };

  return (
    <AnimatePresence>
      {!snap.intro && (

        <>

        <motion.div
        key='custom'
        className='absolute top-0 left-0 z-10'
        {...slideAnimation('left')}>
          <div className='flex items-center min-h-screen'>
            <div className='editortabs-container tabs'>
              {EditorTabs.map((tab)=> (
                <Tab
                  key={tab.name}
                  tab={tab}
                  handleClick={() =>  handleTabClick(tab.name)}
                />
              ))}
              {generateTabContent()}
            </div>
          </div>
        </motion.div>

        {/* Home and Checkout button*/}

         <motion.div
         className='absolute z-10 top-5 right-5 flex space-x-4'
         {...fadeAnimation}>
          <CustomButton
          type='filled'
          title='Home'
          handleClick={()=> state.intro = true}
          customStyles='w-fit px-4 py-2.5 font-bold text-sm'/>
  <CustomButton
          type='filled'
          title={<img src="/checkout.png" alt="Checkout" className="h-5 w-5" />}
          handleClick={() => handleCheckout()}
          customStyles='w-fit px-4 py-2.5 font-bold text-sm'/>
        </motion.div>



        <motion.div
            className='filtertabs-container'
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>


        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer