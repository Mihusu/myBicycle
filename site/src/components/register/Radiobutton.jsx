import { forwardRef } from "react"

export const RadioButton = forwardRef(({ labelName, color, ...register }, ref) => {

  return (
    <div className="form-control place-items-center ">
      <label className="cursor-pointer label w-full flex justify-between">
        <span className="label-text px-2">{labelName}</span>
        <input
          type="radio"
          className={color}
          {...register}
          ref={ref}
        />
      </label>
    </div>
  )
})
