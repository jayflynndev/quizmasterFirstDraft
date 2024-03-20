import InfoBox from "@/InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            backgroundColor="bg-gray-100"
            buttonInfo={{
              text: "Browse Quiz Nights",
              link: "/quiznights",
              backgroundColor: "bg-black",
            }}
          >
            Find your dream Quiz Night. Bookmark Quiz Nights and contact
            Quizmasters.
          </InfoBox>
          <InfoBox
            heading="For Quiz Night Owners"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: "Add Quiz Night",
              link: "/quiznights/add",
              backgroundColor: "bg-blue-500",
            }}
          >
            List your Quiz Nights and reach potential Quizzers.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};
export default InfoBoxes;
