import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const App = () => {
  const [pass, setPass] = useState(null);
  const [range, setRange] = useState(8);
  const [type, setType] = useState({
    num: true,
    lcase: true,
    ucase: true,
    sym: true,
  });

  const typeValues = {
    ucase: "ABCDEFGHIJKLMNOPQRSTUVWXTZ",
    lcase: "abcdefghiklmnopqrstuvwxyz",
    num: "0123456789",
    sym: "~!@#$%^&*()_+=-,./<>?;:",
  };

  const genPass = () => {
    const filteredType = Object.keys(type)
      .filter((k) => {
        return type[k];
      })
      .sort(() => Math.random() - 0.5);

    let i = 0;
    let typeLen = filteredType.length;
    let pswd = [];

    for (i = 0; i < range; i++) {
      let c = 0;
      for (c = 0; c < typeLen; c++) {
        pswd.push(
          typeValues[filteredType[c]].charAt(
            Math.floor(Math.random() * typeValues[filteredType[c]].length)
          )
        );
      }
    }

    setPass(
      pswd
        .sort(() => Math.random() - 0.5)
        .join("")
        .slice(0, range)
    );
  };

  const handleChange = (e) => {
    setPass(e.target.value);
  };

  const handleChangeRange = (e) => {
    if (e.target.value > 3) {
      setRange(e.target.value);
    }
  };

  const handleChangeCheck = (e, t) => {
    const tmpType = { ...type };

    const len = Object.values(tmpType).filter((k) => {
      return k;
    }).length;

    if (len > 1) {
      tmpType[t] = e.target.checked;
      setType(tmpType);
    }

    if (len === 1 && e.target.checked) {
      tmpType[t] = e.target.checked;
      setType(tmpType);
    }
  };

  useEffect(() => {
    genPass();
  }, []);

  useEffect(() => {
    genPass();
  }, [type, range]);

  return (
    <div className="d-flex justify-content-center">
      <div className="card text-center m-5 col-6">
        <h3 className="card-header">Password Generator</h3>

        <div className="card-body">
          <h5 className="card-title mt-3">Customize your password</h5>

          <p className="card-text ">
            <div className="input-group mt-5">
              <input
                type="text"
                className="form-control"
                placeholder="Password"
                onChange={(e) => handleChange(e)}
                value={pass}
              />
              <CopyToClipboard text={pass}>
                <button className="btn btn-outline-primary" type="button">
                  Copy
                </button>
              </CopyToClipboard>
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={genPass}
              >
                Generate
              </button>
            </div>

            <label htmlFor="customRange1" className="form-label mt-5">
              Password Length : <b>{range}</b>
            </label>
            <input
              type="range"
              className="form-range"
              id="customRange1"
              value={range}
              onChange={(e) => {
                handleChangeRange(e);
              }}
            />

            <div className="container d-flex  justify-content-between mt-5 mb-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="ucase"
                  onClick={(e) => {
                    handleChangeCheck(e, "ucase");
                  }}
                  checked={type.ucase}
                />
                <label className="form-check-label" for="ucase">
                  Uppercase
                </label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="lcase"
                  onClick={(e) => {
                    handleChangeCheck(e, "lcase");
                  }}
                  checked={type.lcase}
                />
                <label className="form-check-label" for="lcase">
                  Lowercase
                </label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="num"
                  onClick={(e) => {
                    handleChangeCheck(e, "num");
                  }}
                  checked={type.num}
                />
                <label className="form-check-label" for="num">
                  Numbers
                </label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="sym"
                  onClick={(e) => {
                    handleChangeCheck(e, "sym");
                  }}
                  checked={type.sym}
                />
                <label className="form-check-label" for="sym">
                  Special characters
                </label>
              </div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
