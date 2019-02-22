const { withRouter, BrowserRouter, HashRouter, Switch, Route } = ReactRouterDOM
const { Provider } = ReactRedux

class __App extends React.Component {
  componentWillMount() {
    this.props.showLoader()

    connectExtension()
      .then(({ user, status, error }) => {
        this.props.updateConnectionStatus(status)

        this.props.printLog(`App loaded ${new Date()}`)
        this.props.printLog(status)

        if (user) {
          this.props.setUser(user)
        } else if (error) {
          this.props.showErrorMessage(error)
        }

        // TODO: HACK
        setInterval(() => {
          this.props.updateInstagramServiceStatus(instagram)
        }, 500)
      })
      .finally(() => this.props.hideLoader())
  }

  render() {
    return (
      <div>
        <Wrapper>
          <Switch>
            <Route exact path='/' component={MainPage}/>
            <Route path='/logs' component={LogsPage}/>
            <Route path='/like/user-medias' component={LikeUserPage}/>
            <Route path='/like/hashtag' component={LikeHashtagPage}/>
            <Route path='/like' component={LikeHashtagPage}/>
            <Route path='/follow/followers' component={BlankPage}/>
            <Route path='/follow/followings' component={BlankPage}/>
            <Route path='/blank' component={BlankPage}/>
            <Route path='/empty' component={BlankPage}/>
            <Route path='/404' component={BlankPage}/>
          </Switch>
        </Wrapper>
        <ScrollToTop />
        <LogoutModal />
      </div>
    )
  }
}

const App = withRouter(connect(
  null,
  { updateConnectionStatus, updateInstagramServiceStatus, showLoader, hideLoader, setUser, showErrorMessage, printLog }
)(__App))

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
