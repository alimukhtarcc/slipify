function GenerateSlip() {
  const handleClick = () => {
    // Add your slip generation logic here
    console.log('Generate Slip button clicked');
    alert('Generate Slip clicked — implement logic');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate Slip
      </button>
    </div>
  );
}

export default GenerateSlip;
