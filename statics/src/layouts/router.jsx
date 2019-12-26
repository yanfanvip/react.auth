import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React, { Suspense } from 'react';
import routes from '@/router';
import { AuthRouter } from '@/components/Auth'
import PageLoading from '@/components/PageLoading';

export const renderRoute = (item, index) => {
  if (item.redirect) {
    return (
      <Redirect exact key={index} from={item.path} to={item.redirect}/>
    );
  }
  if(item.path){
    return <AuthRouter key={index} path={item.path} component={item.component}  {...item}/>
  }
  return <AuthRouter key={index} component={item.component} {...item}/>
};

const router = () => {
  return (
    <Router>
      <Suspense fallback={<PageLoading />}>
        <Switch>
          {
            routes.map((route, id) => {
              if(route.child){
                const { component: RouteComponent, child, ...ext } = route;
                return (
                  <AuthRouter key={id} path={route.path} {...ext} component={()=> 
                    <RouteComponent {...ext}>
                      <Switch>
                        { child.map(renderRoute) }
                      </Switch>
                    </RouteComponent>
                  }/>
                )
              }else{
                return renderRoute(route, id)
              }
            })
          }
        </Switch>
      </Suspense>
    </Router>
  );
};

export default router();