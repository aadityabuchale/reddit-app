import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineStatus, setTheme, setWarningMessages } from '../../MyStore/action';

export default function ExampleChakraSwitch({ setChannelTheme, channelTheme, isChecked, type }) {
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch()
  const { messages } = useSelector((state)=>state.WarningSetter)
  const { isDark } = useSelector((state)=>state.UISetter)
  const { user } = useSelector((state)=>state.UserSetter)

  function randomColor() {
    let r, g, b;
    do {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
    } while ((r + g + b) / 3 < 30 || (r + g + b) / 3 > 220);
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  const darkTheme = {
    color: "#D7DADC",
    backgroundColor: "#1A1A1B",
    borderColor: "#474748", 
    childColor: "#818384",
    childbackgroundColor: "#272729",
    childborderColor: "#343536",
    switchColor: "#1A1A1B"
  }

  useEffect(()=>{
    if(isChecked){
      setChecked(true)
    }
  },[])

  useEffect(()=>{
    if(checked){
      setChannelTheme && setChannelTheme(randomColor())
    }
    else{
      setChannelTheme && setChannelTheme('')
    }
  },[checked])
  return (
    <Switch
      checked={checked}
      onChange={(event) => {
        setChecked(event.target.checked)
        if(type==="online"){
          dispatch(setOnlineStatus(event.target.checked))
          dispatch(setWarningMessages([...messages, {message: "Online Status Changed Successfully", timestamp: Date.now(), color: "#006cbf", emoji: "happy"}]))
        }
        if(type==="theme"){
          dispatch(setTheme(event.target.checked ? darkTheme : false))
          dispatch(setWarningMessages([...messages, {message: "Theme Changed Successfully", timestamp: Date.now(), color: "#006cbf", emoji: "happy"}]))
          if(localStorage.getItem("darkMode")){
            const data = JSON.parse(localStorage.getItem("darkMode"))
            if(event.target.checked && !data.includes(user._id)){
              localStorage.setItem("darkMode", JSON.stringify([...data, user._id]))
            }
            else{
              localStorage.setItem("darkMode", JSON.stringify(data.filter((e)=> e !== user._id)))
            }
          }
          else{
            localStorage.setItem("darkMode", JSON.stringify([user._id]))
          }
        }
      }}
      sx={(theme) => ({
        '--Switch-thumbSize': '16px',
        '--Switch-trackWidth': '34px',
        '--Switch-trackHeight': '20px',
        '--Switch-trackBackground': '#CBD5E0',
        '--Switch-thumbBackground': isDark.childbackgroundColor,
        '&:hover': {
          '--Switch-trackBackground': '#CBD5E0',
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-trackBackground': channelTheme ? `#${channelTheme}` :'#3182ce',
          '&:hover': {
            '--Switch-trackBackground': channelTheme ? `#${channelTheme}` : '#3182ce',
          },
          [`&.${switchClasses.disabled}`]: {
            '--Switch-trackBackground': '#3182ce',
          },
        },
        [`&.${switchClasses.disabled}`]: {
          '--Switch-trackBackground': '#CBD5E0',
          opacity: 0.4,
        },
        [theme.getColorSchemeSelector('dark')]: {
          '--Switch-trackBackground': 'rgba(255, 255, 255, 0.24)',
          [`&.${switchClasses.checked}`]: {
            '--Switch-trackBackground': '#90cdf4',
            '&:hover': {
              '--Switch-trackBackground': '#90cdf4',
            },
            [`&.${switchClasses.disabled}`]: {
              '--Switch-trackBackground': '#3182ce',
            },
          },
        },
      })}
    />
  );
}