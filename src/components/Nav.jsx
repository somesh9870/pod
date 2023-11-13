import Breadcrumbs from "./Breadcrumbs";
import HomeLogo from "./svg/HomeLogo";
import Notification from "./svg/Notification";

const Nav = () => {
  const breadcrumbs = [
    { label: <HomeLogo height={30} width={30} color={"#7E22CE"} />, href: "/" },
    { label: "Sample Project" },
    { label: "Upload", href: "/upload" },
  ];

  return (
    // navbar for project page
    <div className="flex justify-between ">
      {/* left corner */}
      <div>
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* right corner */}
      <div className="flex">
        <select className="p-2 mr-4">
          <option className="p-2" value="EN">EN</option>
          <option value="EN">EN</option>
          <option value="EN">EN</option>
        </select>
        <Notification width={35} height={35} />
      </div>
    </div>
  );
};

export default Nav;
