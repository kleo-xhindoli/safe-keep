import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

/**
 * Protected Route Component
 * Works the same way as a Route component from react-router-dom, unless the
 * `condition` prop isn't true, in which case, the user will be redirected to
 * the `redirect` route.
 *
 * @example
 * ```tsx
 * <Switch>
 *   <ProtectedRoute
 *    to="/"
 *    condition={isLoggedIn}
 *    redirect="/login"
 *    component={Home}
 *  />
 * </Switch>
 * ```
 */

interface ProtectedRouteProps extends RouteProps {
  condition: boolean;
  redirect: string;
}

const getFrom = (props: any): string => {
  return (
    (props.location.state && props.location.state.from) ||
    props.location.pathname
  );
};

class ProtectedRoute extends Route<ProtectedRouteProps> {
  public render() {
    let redirectPath: string = "";
    if (!this.props.condition) {
      redirectPath = this.props.redirect;
    }

    if (redirectPath) {
      const renderComponent = (props: any) => (
        <Redirect
          to={{ pathname: redirectPath, state: { from: getFrom(props) } }}
        />
      );
      return (
        <Route
          {...this.props}
          component={renderComponent}
          render={undefined}
          children={undefined}
        />
      );
    } else {
      return <Route {...this.props} />;
    }
  }
}

export default ProtectedRoute;
