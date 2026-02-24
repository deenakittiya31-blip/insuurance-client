import { useState } from "react"
import TextInput from "../form/TextInput"

const InstallmentSetting = ({ value, onChange }) => {
  const isFixed = value.min !== '' && value.max !== '' && value.min === value.max
  const [mode, setMode] = useState(isFixed ? 'fix' : 'range')
  return (
    <div className="flex flex-col gap-3 font-prompt">
      <label className="text-sm font-semibold text-text-primary">รูปแบบการผ่อน</label>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="radio"
            className="radio radio-xs radio-info"
            checked={mode === 'fix'}
            onChange={() => {
              setMode('fix')
              onChange({ min: value.min, max: value.min })
            }} />
          Fix งวด
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input type="radio" className="radio radio-xs radio-info" checked={mode === 'range'} onChange={() => setMode('range')} />
          ให้ลูกค้าเลือกได้
        </label>
      </div>

      {mode === 'fix' ? (
        <TextInput
          title="จำนวนงวด"
          type="number"
          value={value.min}
          onChange={(e) => onChange({ min: +e.target.value, max: +e.target.value })}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <TextInput
            title="งวดต่ำสุด"
            type="number"
            value={value.min}
            onChange={(e) => onChange({ ...value, min: +e.target.value })}
          />
          <TextInput
            title="งวดสูงสุด"
            type="number"
            value={value.max}
            onChange={(e) => onChange({ ...value, max: +e.target.value })}
          />
        </div>
      )}
    </div>
  )
}
export default InstallmentSetting