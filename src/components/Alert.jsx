const Alert = ({alert}) => {
  return (
    <>
        <div className={`${alert.error ? ' from-red-400 to-red-600' : 'from-blue-400 to-blue-600'} 
                                             bg-gradient-to-r mt-5 rounded-xl text-center text-white p-1 font-bold`}>
            {alert.msg}
        </div>
    </>
  )
}

export default Alert