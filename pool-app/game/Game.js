import { lifecycle, compose, branch, renderComponent } from 'recompose';
import _ from 'lodash';
import NewGameContainer from './newGame/NewGameContainer';
import ActiveGameContainer from './activeGame/ActiveGameContainer';

export default compose(lifecycle({
  componentWillMount() {
    this.props.createOrResumeGame();
  }
}), branch(
  (props) => {
    const isGameInProgress = _.get(props, ['getGame', 'Game', 'inProgress'], false);
    return isGameInProgress;
  },
  renderComponent(ActiveGameContainer)
))(NewGameContainer);
