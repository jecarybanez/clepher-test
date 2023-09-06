function KeyData({ keyData }) {
  return (
    <div className="w-full flex justify-between py-1 border-blue-200 border-b-[1px] text-sm">
      <p className="font-bold">{keyData.name}</p>
      <p>{keyData.value}</p>
    </div>
  );
}

export default KeyData;
