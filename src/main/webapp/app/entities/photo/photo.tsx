import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPhoto } from 'app/shared/model/photo.model';
import { getEntities } from './photo.reducer';

export const Photo = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const photoList = useAppSelector(state => state.photo.entities);
  const loading = useAppSelector(state => state.photo.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="photo-heading" data-cy="PhotoHeading">
        <Translate contentKey="rafarosApp.photo.home.title">Photos</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="rafarosApp.photo.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/photo/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="rafarosApp.photo.home.createLabel">Create new Photo</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {photoList && photoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="rafarosApp.photo.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="rafarosApp.photo.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="rafarosApp.photo.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="rafarosApp.photo.image">Image</Translate>
                </th>
                <th>
                  <Translate contentKey="rafarosApp.photo.height">Height</Translate>
                </th>
                <th>
                  <Translate contentKey="rafarosApp.photo.width">Width</Translate>
                </th>
                <th>
                  <Translate contentKey="rafarosApp.photo.taken">Taken</Translate>
                </th>
                <th>
                  <Translate contentKey="rafarosApp.photo.uploaded">Uploaded</Translate>
                </th>
                <th>
                  <Translate contentKey="rafarosApp.photo.album">Album</Translate>
                </th>
                <th>
                  <Translate contentKey="rafarosApp.photo.tag">Tag</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {photoList.map((photo, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/photo/${photo.id}`} color="link" size="sm">
                      {photo.id}
                    </Button>
                  </td>
                  <td>{photo.title}</td>
                  <td>{photo.description}</td>
                  <td>
                    {photo.image ? (
                      <div>
                        {photo.imageContentType ? (
                          <a onClick={openFile(photo.imageContentType, photo.image)}>
                            <img src={`data:${photo.imageContentType};base64,${photo.image}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {photo.imageContentType}, {byteSize(photo.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{photo.height}</td>
                  <td>{photo.width}</td>
                  <td>{photo.taken ? <TextFormat type="date" value={photo.taken} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{photo.uploaded ? <TextFormat type="date" value={photo.uploaded} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{photo.album ? <Link to={`/album/${photo.album.id}`}>{photo.album.title}</Link> : ''}</td>
                  <td>
                    {photo.tags
                      ? photo.tags.map((val, j) => (
                          <span key={j}>
                            <Link to={`/tag/${val.id}`}>{val.name}</Link>
                            {j === photo.tags.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/photo/${photo.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/photo/${photo.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/photo/${photo.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="rafarosApp.photo.home.notFound">No Photos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Photo;
