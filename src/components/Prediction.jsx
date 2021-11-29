import { TextField, Typography, Chip, Button } from "@material-ui/core";
import { useState } from "react";

const BASE_URL = process.env.REACT_APP_API_BASE_URL

const Prediction = ({ idx }) => {
  const [text, setText] = useState('')
  const [prediction, setPrediction] = useState('')
  const [isLoading, setLoading] = useState(false)
  
  const handlePredict = () => {
    setLoading(true)
    setPrediction('')
    fetch(BASE_URL + '/predict', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({idx: idx, tests: [text]})
    })
      .then(result => {
        if (result.ok) { return result.json() }
        else { throw Error() }
      })
      .then(data => { setPrediction(data[0].result) })
      .catch(_ => { /*setOpenError(true)*/ })
      .finally(() => { setLoading(false) })
  }

  return (
    <div>
      <Typography variant="h6" component="div" gutterBottom>
        Live test
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        You can copy paste any article in the field below and get a prediction using this model
      </Typography>
      <TextField
        label="Text to categorise"
        multiline
        InputLabelProps={{
          shrink: true,
        }}
        rows={10}
        rowsMax={10}
        value={text}
        onChange={(ev) => {
          setText(ev.target.value)
        }}
        style={{ width: '100%' }}
        variant="filled"
      />
      <div style={{marginTop: '1em'}}>
        <Button variant="contained" color="primary" style={{marginRight: '1em'}} disabled={isLoading}
        onClick={handlePredict}
        >Predict</Button>

        {prediction === 'f' ? <Chip label="FAKE" color="danger" variant="contained"  /> : 
          (prediction === 'r' ? <Chip label="REAL" color="success"  /> : null)}
        
      </div>
    </div>
  )
}

export default Prediction;