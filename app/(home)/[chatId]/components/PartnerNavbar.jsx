export default function PartnerNavbar({ chatInfo, user }) {
  const partner = chatInfo?.participants?.find(
    (curUser) => curUser._id !== user._id
  );
  const username = partner?.username;

  return (
    <div className=" h-[5rem] p-4 flex shadow-[0_3px_3px_-3px_#00000024]">
      <div className="flex gap-2">
        <figure className="h-[full] aspect-square flex justify-center items-center rounded-full bg-red-500 p-1"
        style={partner && { backgroundColor: partner.avatarBg }}>
          <h1 className="text-white text-xl pb-1">{username ? username[0]: "A"}</h1>
        </figure>
        <h2 className="flex items-center">{username && username}</h2>
      </div>
    </div>
  );
}
