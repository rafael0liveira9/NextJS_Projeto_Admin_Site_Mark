// ** React Imports
import { useState } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** Context Imports
import { AbilityContext } from "src/layouts/components/acl/Can";

// ** Config Import
import { buildAbilityFor } from "src/configs/acl";

// ** Component Import
import NotAuthorized from "src/pages/401";
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Hooks
import { useAuth } from "src/hooks/useAuth";

const AclGuard = (props) => {
  // ** Props
  const { aclAbilities, children, guestGuard, cookies } = props;
  const [ability, setAbility] = useState(undefined);

  // ** Hooks
  const auth = useAuth();
  const router = useRouter();

  if (
    guestGuard ||
    router.route === "/404" ||
    router.route === "/500" ||
    router.route === "/"
  ) {
    return <>{children}</>;
  }
  if (auth.user && auth.user.User.roleTypeId == 1 && !ability) {
    setAbility(
      buildAbilityFor(auth.user.User.roleTypeId, aclAbilities.subject)
    );
  }

  // Check the access of current user and render pages
  if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return (
      <AbilityContext.Provider value={ability}>
        {children}
      </AbilityContext.Provider>
    );
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  );
};

export default AclGuard;
