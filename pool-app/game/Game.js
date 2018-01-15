import { lifecycle, compose, branch, renderComponent } from 'recompose';
import Loading from '../loading/Loading';
import NewGameContainer from './newGame/NewGameContainer';

export default compose(lifecycle({
  componentWillMount() {
    this.props.createOrResumeGame();
  }
}), branch(
  props => props.loading,
  renderComponent(Loading)
))(NewGameContainer);
