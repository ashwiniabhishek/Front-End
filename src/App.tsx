import React from 'react'
import { Table } from './components/Table/Table'
import { Header} from './components/Header/Header'
import './App.css'                                                                                          

const App = () => {

  const [rows,addRows] = React.useState([{
    fileName:'File Name',
    result:'Result',
    url_pdf:'',
    url_json:'',
    url_text:''
  }])

  const onChangeListener = (event: React.ChangeEvent<HTMLInputElement>) => {
      let file = event.target.files![0]

      let formData = new FormData()
      
      formData.append("userfile",file)

      let indexToChange  = rows.length;
      addRows((prevRows) => {
        let newRows = [...prevRows,{fileName:file.name,result:'wait while it is being processed ...',url_pdf:'',url_json:'',url_text:''}]
        return newRows
      })

      // let rowsDeepCopy = JSON.parse(JSON.stringify(newRows));//I am making copy because directly changing the state is bad practice,remember when you copy an array with ... it's a shallow copy so references of the objects with the array being copied remain same.

      let url = " http://127.0.0.1:5000/upload"

      fetch(url,{
          method: 'POST',
          body:formData}).then(response => response.json()).then(response => {
            // rowsDeepCopy[rowsDeepCopy.length-1].url = response["url"]
            // // console.log(file.name)
            // rowsDeepCopy[rowsDeepCopy.length-1].result = "Download"
            // addRows(rowsDeepCopy)
            addRows((prevRows) => {
              let rowsDeepCopy = JSON.parse(JSON.stringify(prevRows))
              rowsDeepCopy[indexToChange].url_pdf = "http://127.0.0.1:5000/"+response["url_pdf"]
              rowsDeepCopy[indexToChange].url_json = "http://127.0.0.1:5000/"+response["url_json"]
              rowsDeepCopy[indexToChange].url_text = "http://127.0.0.1:5000/"+response["url_txt"]
              rowsDeepCopy[indexToChange].result = "Download"
              return rowsDeepCopy
            })
            // console.log(rowsDeepCopy)
            // console.log(response)
          })
  }



  return (
    <div className="App">

      <Header/>

      <div className="input-control">
        <button className="btn">Upload a file</button>
        <input type="file" id="audio" onChange={onChangeListener} className='button-custom'></input>
      </div>

      <Table rows = {rows}/>
    </div>
  );
}

export default App;
